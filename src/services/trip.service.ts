import Trip, { ITrip } from "../models/trip.model";
import stations from "../config/station";

// Lấy danh sách chuyến xe
export const getAllTrips = async (filters: any): Promise<any> => {
  const query = {
    ...(filters.startLocation && { startLocation: filters.startLocation }),
    ...(filters.endLocation && { endLocation: filters.endLocation }),
    ...(filters.startTime && {
      startTime: { $gte: new Date(filters.startTime) },
    }),
  };
  const trips = await Trip.find(query).sort("startTime");
  const updatedTrips = trips.map((trip) => ({
    trip,
    startLocation: stations.find(
      (station) => station.code === trip.startLocation
    ),
    endLocation: stations.find((station) => station.code === trip.endLocation),
  }));
  return { trips: updatedTrips, size: updatedTrips.length };
};

// Lấy thông tin chuyến xe theo ID
export const getTripDetails = async (tripId: string): Promise<any> => {
  const trip = await Trip.findById(tripId);
  if (trip) {
    const startLocation = stations.find(
      (station) => station.code === trip.startLocation
    );
    const endLocation = stations.find(
      (station) => station.code === trip.endLocation
    );
    return { trip, startLocation, endLocation };
  }
  return { trip };
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
