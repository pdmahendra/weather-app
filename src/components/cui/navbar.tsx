import { LocateFixed, Search, Star, X, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { useWeatherStore } from "@/globalstore/weatherStore";
import { getCurrentLocation } from "@/utils/getCurrentLocation";
import { searchCityByName } from "@/services/getCityByLatLon";

type City = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const weatherData = useWeatherStore((s) => s.weatherData);
  const setLocation = useWeatherStore((s) => s.setLocation);
  const setWeatherData = useWeatherStore((s) => s.setWeatherData);
  const location = useWeatherStore((s) => s.location) as City | null;
  const favorites = useWeatherStore((s) => s.favorites);
  const addFavorite = useWeatherStore((s) => s.addFavorite);
  const removeFavorite = useWeatherStore((s) => s.removeFavorite);
  const loadFavoritesFromStorage = useWeatherStore(
    (s) => s.loadFavoritesFromStorage
  );

  useEffect(() => {
    loadFavoritesFromStorage();
  }, [loadFavoritesFromStorage]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 1) {
        try {
          const data = await searchCityByName(query);
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleCityClick = (city: City) => {
    setQuery(city.name);
    setSuggestions([]);
    setLocation(city);
  };

  const isFavorite = location
    ? favorites.some((fav) => fav.id === location.id)
    : false;

  const toggleFavorite = () => {
    if (!location) return;
    if (isFavorite) {
      removeFavorite(location.id);
    } else {
      addFavorite({ ...location, weatherData: weatherData });
    }
  };

  const handleFavoriteClick = (fav: any) => {
    setWeatherData(fav.weatherData);
    setShowFavorites(false)
  };

  const handleCurrentLocationClick = () => {
    const getCity = async () => {
      const city = await getCurrentLocation();
      setLocation(city);
    };

    getCity();
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="text-2xl font-bold">Weather</div>

      <div className="flex gap-4 relative">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city"
            className="pl-10"
          />

          {suggestions?.length > 0 && (
            <Card className="absolute top-full mt-1 w-full shadow-md border rounded-lg bg-white dark:bg-gray-900 max-h-60 overflow-y-auto z-50">
              <ul className="divide-y">
                {suggestions.map((city) => (
                  <li
                    key={city.id}
                    className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleCityClick(city)}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={toggleFavorite}
          disabled={!location}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          <Star className="w-4 h-4" />
          Favorites
        </Button>

        {showFavorites && (
          <Card className="absolute right-0 top-full mt-1 w-[300px] shadow-md border rounded-lg bg-white dark:bg-gray-900 max-h-60 overflow-y-auto z-50">
            <ul className="divide-y">
              {favorites.length > 0 ? (
                favorites.map((fav) => (
                  <li
                    key={fav.id}
                    className="px-3 py-2 flex justify-between items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => handleFavoriteClick(fav)}
                    >
                      {fav.weatherData.location.name},{" "}
                      {fav.weatherData.location.country}
                    </span>
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-500">
                  No favorites yet
                </li>
              )}
            </ul>
          </Card>
        )}

        <Button variant={"destructive"} onClick={handleCurrentLocationClick}>
          <LocateFixed className="mr-2" />
          Current Location
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
