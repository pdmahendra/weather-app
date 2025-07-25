import { create } from "zustand";
import { persist } from "zustand/middleware";

export type City = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export type FavoriteCity = City & {
  weatherData: any;
};

type WeatherState = {
  location: City | null;
  weatherData: any | null;

  currentLocationWeather: any | null;

  favorites: FavoriteCity[];

  setLocation: (city: City) => void;
  setWeatherData: (data: any) => void;

  setCurrentLocationWeather: (data: any) => void;

  addFavorite: (city: City, weatherData: any) => void;
  removeFavorite: (cityId: string) => void;
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      location: null,
      weatherData: null,

      currentLocationWeather: null,
      favorites: [],

      setLocation: (city) => set({ location: city }),
      setWeatherData: (data) => set({ weatherData: data }),

      setCurrentLocationWeather: (data) =>
        set({ currentLocationWeather: data }),

      addFavorite: (city, weatherData) => {
        const updated = [...get().favorites, { ...city, weatherData }];
        set({ favorites: updated });
      },

      removeFavorite: (cityId) => {
        const updated = get().favorites.filter((c) => c.id !== cityId);
        set({ favorites: updated });
      },
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        currentLocationWeather: state.currentLocationWeather,
      }),
    }
  )
);