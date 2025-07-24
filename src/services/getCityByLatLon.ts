import { axiosInstance } from "@/lib/axios";

export async function searchCityByLatLon(lat: number, lon: number) {
  const res = await axiosInstance.get("/search.json", {
    params: { q: `${lat},${lon}` },
  });

  if (res.data && res.data.length > 0) {
    const city = res.data[0];
    return {
      id: String(city.id),
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    };
  }

  return null;
}

export async function searchCityByName(name: string) {
  const res = await axiosInstance.get("/search.json", {
    params: { q: name },
  });

  if (res.data && res.data.length > 0) {
    return res.data.map((city: any) => ({
      id: String(city.id),
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
  }

  return [];
}
