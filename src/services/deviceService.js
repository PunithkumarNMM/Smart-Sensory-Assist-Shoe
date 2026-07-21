import API from "../api/axios";

export const getMyDevices = async () => {
  const response = await API.get("/device/my-devices");
  return response.data;
};