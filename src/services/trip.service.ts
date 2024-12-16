import Trip, { ITrip } from "../models/trip.model";
import stations from "../config/station";

// Hàm chuyển đổi mã bến thành tên bến cho một chuyến đi
function convertLocation(trips: ITrip[]) {
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

// Lấy danh sách chuyến xe
export const getAllTrips = async (filters: any): Promise<any> => {
  // const currentTime = new Date(); // Thời điểm hiện tại
  // const myStartTime = filters.time
  //   ? new Date(filters.time) // Nếu có filters.time, dùng giá trị đó
  //   : new Date(currentTime.getTime() + 15 * 60000); // Nếu không, dùng thời gian hiện tại + 15 phút

  // const myEndTime = new Date(myStartTime.getTime() + 24 * 60 * 60 * 1000); // 24 giờ sau myStartTime

  // const query = {
  //   ...(filters.startLocation && { startLocation: filters.startLocation }),
  //   ...(filters.endLocation && { endLocation: filters.endLocation }),
  //   startTime: { $lte: myStartTime }, // startTime lớn hơn hoặc bằng myStartTime
  //   endTime: { $gte: myEndTime }, // endTime nhỏ hơn hoặc bằng myEndTime
  // };

  // console.log(query);

  const currentTime = new Date(); // Lấy thời gian hiện tại nếu filters.time không có
  const time = filters.time ? new Date(filters.time) : currentTime;
  const endOfDay = new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate() + 1,
    0,
    0,
    0
  );

  // Xây dựng query
  const query = {
    $or: [
      {
        $and: [
          { repeat: 0 },
          {
            departureTime: { $gte: time, $lte: endOfDay },
          },
        ],
      },
      {
        $and: [
          { repeat: 1 }, // repeat = 1
          { startTime: { $lte: time } },
          {
            endTime: { $gte: endOfDay },
          },
        ],
      },
    ],
    ...(filters.startLocation && { startLocation: filters.startLocation }),
    ...(filters.endLocation && { endLocation: filters.endLocation }),
  };

  // Lấy giờ và phút của `filters.time`
  const filterHours = time.getHours();
  const filterMinutes = time.getMinutes();

  const tripsOfDay = await Trip.find(query).sort("startTime");
  const trips = tripsOfDay.filter((trip) => {
    const departureTime = new Date(trip.departureTime);
    return (
      departureTime.getHours() >= filterHours &&
      departureTime.getMinutes() >= filterMinutes
    );
  });
  return { trips: convertLocation(trips), size: trips.length };
};

// Lấy thông tin chuyến xe theo ID
export const getTripDetails = async (tripId: string): Promise<any> => {
  const trip = await Trip.findById(tripId);
  if (trip) {
    return convertLocation([...[trip]])[0];
  }
  return trip;
};

// Tạo chuyến xe mới
export const createNewTrip = async (
  tripData: Partial<ITrip>
): Promise<ITrip> => {
  return Trip.create(tripData);
};

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
