export const getDeviceEndpoints = (deviceId: string) => ({
  DEVICE_DASHBOARD: `/devices/${deviceId}/dashboard`,
  IMAGE_DETECTION: `/images/disease-detection`,
  SOLUTIONS: `/solutions`,
  WEATHER_DETAILS: `/devices/${deviceId}/weather/details`,
  DEVICE_ULTRASONIC: `/devices/${deviceId}/logs/ultrasonic`,
  DEVICE_PUMP: `/devices/${deviceId}/logs/pumps`,
  DEVICE_IMAGE: (imgName: string) =>
    `${process.env.API_BASE_URL?.replace('/api', '')}/images/${imgName}`,
});

export const STATIC_ENDPOINTS = {
  DEVICE_DATA: `/devices/data`,
};