import type { City } from "@/globalstore/weatherStore";
import { searchCityByLatLon } from "@/services/getCityByLatLon";

const MALTA_LOCATION: City = {
  id: "malta",
  name: "Malta",
  country: "Malta",
  lat: 35.8997,
  lon: 14.5146,
};

export async function getCurrentLocation(): Promise<City> {
  if (!navigator.geolocation) return MALTA_LOCATION;

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const city = await searchCityByLatLon(lat, lon);
    return city ?? MALTA_LOCATION;
  } catch (error) {
    console.error("Geolocation error:", (error as Error).message);
    return MALTA_LOCATION;
  }
}
