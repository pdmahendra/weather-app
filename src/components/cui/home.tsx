import { useWeatherStore } from "@/globalstore/weatherStore";
import { Skeleton } from "../ui/skeleton";
import AqiComponent from "./aqiComponent";
import AstroComponent from "./astroComponent";
import CommonCard from "./commonCard";
import CurrentTemp from "./currentTemp";
import DayForecast from "./dayForcastCard";
import HourlyTempChart from "./hourlyTempChart";
import { useState } from "react";

const Home = () => {
  const weatherData = useWeatherStore((s) => s.weatherData);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  if (!weatherData) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl col-span-1" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const { location, forecast } = weatherData;
  const selectedDay = forecast.forecastday[selectedDayIndex];

  const { day, hour, astro } = selectedDay;

  const realTimeCurrent = weatherData.current;

  const currentTempData =
    selectedDayIndex === 0
      ? realTimeCurrent
      : { temp_c: day.avgtemp_c, condition: day.condition };

  const airQuality =
    selectedDayIndex === 0 ? realTimeCurrent?.air_quality : null;

  const commonStats = [
    {
      title: "Humidity",
      value: `${day.avghumidity}%`,
      icon: "drop" as const,
    },
    {
      title: "Pressure",
      value: `${day?.pressure_mb || realTimeCurrent?.pressure_in || "--"} hPa`,
      icon: "gauge" as const,
    },
    {
      title: "Visibility",
      value: `${day.avgvis_km} km`,
      icon: "eye" as const,
    },
    {
      title: "Wind",
      value: `${day.maxwind_kph} km/h`,
      icon: "navigation" as const,
    },
    {
      title: "Feels Like",
      value: `${day.avgtemp_c.toFixed(1)}°C`,
      icon: "thermometer" as const,
    },
  ];

  const transformedHourly = hour.map((h: any) => ({
    time: new Date(h.time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      hour12: true,
    }),
    temp: h.temp_c,
  }));

  return (
    <div className="md:grid md:grid-cols-8 md:gap-4 space-y-4 md:space-y-0">
      <div className="col-span-2">
        <CurrentTemp
          current={currentTempData}
          location={location}
          date={selectedDay?.date}
        />
      </div>

      <div className="col-span-3">
        <AqiComponent airQuality={airQuality} />
      </div>

      <div className="col-span-3">
        <AstroComponent astro={astro} />
      </div>

      <div className="col-span-8 md:grid md:grid-cols-5 md:gap-4 space-y-2 md:space-y-0">
        {commonStats?.map((item) => (
          <CommonCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="col-span-8 space-y-4">
        <HourlyTempChart hourly={transformedHourly} />
        <DayForecast
          forecast={forecast.forecastday.map((day: any, index: number) => ({
            label:
              index === 0
                ? "Today"
                : index === 1
                ? "Tomorrow"
                : new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  }),
            iconUrl: day.day.condition.icon,
            temp: `${day.day.maxtemp_c.toFixed(
              1
            )}° / ${day.day.mintemp_c.toFixed(1)}°C`,
            selected: selectedDayIndex === index,
            onClick: () => setSelectedDayIndex(index),
          }))}
        />
      </div>
    </div>
  );
};

export default Home;
