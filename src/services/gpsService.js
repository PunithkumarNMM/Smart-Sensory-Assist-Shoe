import API from "../api/axios";

export const getLiveLocation = async (deviceId) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`/gps/live/${deviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getLocationHistory = async (deviceId) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`/gps/history/${deviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};