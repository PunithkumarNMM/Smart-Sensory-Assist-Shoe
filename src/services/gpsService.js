import API from "../api/axios";

// Get Live GPS Location
export const getLatestLocation = async (deviceId) => {
  const response = await API.get(`/gps/live/${deviceId}`);
  return response.data;
};

// Get GPS History
export const getLocationHistory = async (deviceId) => {
  const response = await API.get(`/gps/history/${deviceId}`);
  return response.data;
};

// Update GPS Location
export const updateLocation = async (locationData) => {
  const response = await API.post("/gps/update", locationData);
  return response.data;
};