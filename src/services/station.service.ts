import stations from "../configs/station";

export const getAllStation = () => {
  return stations;
};

export const getStationByCode = (code: string) => {
  return stations.find((station) => station.code === code) || null;
};
