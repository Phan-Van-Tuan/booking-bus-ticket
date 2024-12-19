import stations from "../config/station";
import Bus, { IBus } from "../models/bus.model";

export const getAllStation = () => {
  return stations;
};

export const getStationByCode = (code: string) => {
  return stations.find((station) => station.code === code) || null;
};

// 1. Lấy danh sách tất cả các xe
export async function getAllBuses(): Promise<IBus[]> {
  return await Bus.find();
}

// 2. Tìm xe theo ID
export async function getBusById(busId: string): Promise<IBus | null> {
  return await Bus.findById(busId);
}

// 3. Thêm xe mới
export async function createBuses(busData: IBus): Promise<IBus> {
  const newBus = new Bus(busData);
  return await newBus.save();
}

// 4. Cập nhật thông tin xe
export async function updateBusById(
  busId: string,
  updateData: Partial<IBus>
): Promise<IBus | null> {
  return await Bus.findByIdAndUpdate(busId, updateData, { new: true });
}

// 5. Xóa xe
export async function deleteBusById(busId: string): Promise<IBus | null> {
  return await Bus.findByIdAndDelete(busId);
}
