import { useEffect } from "react";
import { getCurrentLocation } from "./utils/getCurrentLocation";
import { useWeatherStore } from "./globalstore/weatherStore";
import { useWeatherForecast } from "./services/getWeatherForecast";
import Navbar from "./components/cui/navbar";
import Home from "./components/cui/home";

function App() {
  const location = useWeatherStore((s) => s.location);
  const setLocation = useWeatherStore((s) => s.setLocation);
  const setWeatherData = useWeatherStore((s) => s.setWeatherData);
  const setCurrentLocationWeather = useWeatherStore(
    (s) => s.setCurrentLocationWeather
  );
  const currentLocationWeather = useWeatherStore(
    (s) => s.currentLocationWeather
  );

  useEffect(() => {
    const getCity = async () => {
      const city = await getCurrentLocation();
      setLocation(city);
    };

    getCity();
  }, []);

  const lat = location?.lat ?? 0;
  const lon = location?.lon ?? 0;

  const { data, isSuccess } = useWeatherForecast(lat, lon);

  useEffect(() => {
    if (navigator.onLine) {
      if (isSuccess && data && location) {
        setWeatherData(data);
        setCurrentLocationWeather(data);
      }
    } else {
      if (currentLocationWeather) {
        setWeatherData(currentLocationWeather);
      }
    }
  }, [isSuccess, data, location, currentLocationWeather]);

  return (
    <div className="w-full max-w-7xl mx-auto py-4 space-y-4 px-4 md:px-0">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
