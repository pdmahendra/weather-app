import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getWeatherForecast = async (
  lat: number,
  lon: number,
  days = 7
) => {
  const response = await axiosInstance.get("/forecast.json", {
    params: {
      q: `${lat},${lon}`,
      days,
      aqi: "yes",
      alerts: "yes",
    },
  });
  return response.data;
};

export const useWeatherForecast = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeatherForecast(lat, lon),
    enabled: !!lat && !!lon,
  });
};
