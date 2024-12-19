import Trip, { CreateTripParams, ITrip } from "../models/trip.model";
import stations from "../config/station";
import Bus from "../models/bus.model";

// Hàm chuyển đổi mã bến thành tên bến cho một chuyến đi
function convert(trips: ITrip[]) {
  return trips.map((trip) => {
    // Tìm tên bến cho startPoint
    const startStation = stations.find(
      (station) => station.code === trip.startLocation
    );
    const endStation = stations.find(
      (station) => station.code === trip.endLocation
    );
    return {
      ...trip.toObject(),
      startLocation: startStation ? startStation.name : trip.startLocation,
      endLocation: endStation ? endStation.name : trip.endLocation,
    };
  });
}

export const getAllTrips = async (filters: any): Promise<any> => {
  const query: Record<string, any> = {};

  // Nếu có thời gian lọc
  if (filters.time) {
    const startOfDay = new Date(filters.time);
    startOfDay.setHours(0, 0, 0, 0); // Đầu ngày

    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999); // Cuối ngày

    query.departureTime = {
      $gte: startOfDay, // Lớn hơn hoặc bằng đầu ngày
      $lte: endOfDay, // Nhỏ hơn hoặc bằng cuối ngày
    };
  }

  // Lọc theo địa điểm nếu có
  if (filters.startLocation) {
    query.startLocation = filters.startLocation;
  }
  if (filters.endLocation) {
    query.endLocation = filters.endLocation;
  }

  // Tìm kiếm và sắp xếp các chuyến đi
  const trips = await Trip.find(query)
    .sort({ departureTime: 1 })
    .skip(filters.skip || 0)
    .limit(filters.limit || 20);

  // Trả về danh sách chuyến đi và kích thước
  return { trips: convert(trips), size: trips.length };
};

// Lấy thông tin chuyến xe theo ID
export const getTripDetails = async (tripId: string): Promise<any> => {
  const trip = await Trip.findById(tripId);
  if (trip) {
    return convert([...[trip]])[0];
  }
  return trip;
};

export const createTrips = async (params: CreateTripParams): Promise<any> => {
  const { bus, startLocation, endLocation, price, schedule } = params;
  const { startDate, endDate, type, customSchedule, time } = schedule;

  const MAX_TRIPS: Record<string, number> = {
    daily: 31,
    weekly: 52,
    monthly: 12,
    custom: 20,
    just_one: 1,
  };

  const incrementDate: Record<string, (date: Date) => void> = {
    daily: (date) => date.setDate(date.getDate() + 1),
    weekly: (date) => date.setDate(date.getDate() + 7),
    monthly: (date) => date.setMonth(date.getMonth() + 1),
    custom: (date) => {
      if (typeof customSchedule === "number" && customSchedule > 0) {
        date.setDate(date.getDate() + customSchedule);
      } else {
        throw new Error(
          "customSchedule must be a positive number for custom type"
        );
      }
    },
    just_one: () => {}, // Không thay đổi ngày
  };

  const selectedBus = await Bus.findById(bus);
  if (!selectedBus) throw new Error("Bus not found!");

  const availableSeats = selectedBus.seatCapacity;
  const trips: ITrip[] = [];
  let currentDate = new Date(startDate);
  let tripCount = 0;

  const maxTrips = MAX_TRIPS[type] ?? MAX_TRIPS.just_one;

  while (!endDate || currentDate <= new Date(endDate)) {
    if (tripCount >= maxTrips) break;

    const departureTime = getDepartureTime(currentDate, time.departure);
    const arriveTime = calculateArrivalTime(departureTime, time.drive);

    trips.push(
      await Trip.create({
        bus,
        startLocation,
        endLocation,
        departureTime,
        arriveTime,
        price,
        availableSeats,
      })
      // new Trip({
      //   bus,
      //   startLocation,
      //   endLocation,
      //   departureTime,
      //   arriveTime,
      //   price,
      //   availableSeats,
      // })
    );

    tripCount++;
    incrementDate[type]?.(currentDate);

    if (type === "just_one" || !endDate) break; // Dừng nếu chỉ tạo một chuyến hoặc không có ngày kết thúc
  }

  return { trips: trips, size: trips.length };
};

// Hàm phụ trợ để tính thời gian xuất phát
function getDepartureTime(baseDate: Date, departure: string): Date {
  const [hours, minutes] = departure.split(":").map(Number);
  const departureTime = new Date(baseDate);
  departureTime.setHours(hours, minutes, 0, 0);
  return departureTime;
}

// Hàm phụ trợ để tính thời gian đến nơi
function calculateArrivalTime(departureTime: Date, driveHours: number): Date {
  return new Date(departureTime.getTime() + driveHours * 60 * 60 * 1000);
}

// Cập nhật chuyến xe theo ID
export const updateTripById = async (
  tripId: string,
  updateData: Partial<ITrip>
): Promise<ITrip | null> => {
  return Trip.findByIdAndUpdate(tripId, updateData, { new: true });
};

// Xóa chuyến xe theo ID
export const deleteTripById = async (tripId: string): Promise<ITrip | null> => {
  return Trip.findByIdAndDelete(tripId);
};
