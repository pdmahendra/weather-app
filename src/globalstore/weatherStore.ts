import { create } from "zustand";

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
  loadCurrentLocationWeather: () => void;

  addFavorite: (city: FavoriteCity) => void;
  removeFavorite: (cityId: string) => void;
  loadFavoritesFromStorage: () => void;
};

export const useWeatherStore = create<WeatherState>((set, get) => ({
  location: null,
  weatherData: null,
  currentLocationWeather: null,
  favorites: [],

  setLocation: (city) => set({ location: city }),

  setWeatherData: (data) => set({ weatherData: data }),

  setCurrentLocationWeather: (data) => {
    localStorage.setItem("currentLocationWeather", JSON.stringify(data));
    set({ currentLocationWeather: data });
  },

  loadCurrentLocationWeather: () => {
    const stored = localStorage.getItem("currentLocationWeather");
    if (stored) {
      set({ currentLocationWeather: JSON.parse(stored) });
    }
  },

  addFavorite: (city) => {
    const current = get().favorites;
    const updated = [...current, city];
    set({ favorites: updated });
    localStorage.setItem("favorites", JSON.stringify(updated));
  },

  removeFavorite: (cityId) => {
    const updated = get().favorites.filter((c) => c.id !== cityId);
    set({ favorites: updated });
    localStorage.setItem("favorites", JSON.stringify(updated));
  },

  loadFavoritesFromStorage: () => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      set({ favorites: JSON.parse(stored) });
    }
  },
}));
