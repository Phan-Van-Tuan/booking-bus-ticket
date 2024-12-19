import stations from "../config/station";

export const getAllStation = () => {
  return stations;
};

export const getStationByCode = (code: string) => {
  return stations.find((station) => station.code === code) || null;
};
