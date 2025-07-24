
interface ForecastDay {
  label: string;
  iconUrl: string;
  temp: string;
  selected?: boolean;
  onClick?: () => void;
}

interface DayForecastProps {
  forecast: ForecastDay[];
}

const DayForecast = ({ forecast }: DayForecastProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          onClick={day?.onClick}
          className={`flex-1 min-w-[100px] max-w-[150px] text-center cursor-pointer shadow-sm rounded-3xl ${
            day?.selected ? "bg-blue-600 text-white" : "bg-muted/30"
          }`}
        >
          <div className="p-4 space-y-2 flex flex-col items-center">
            <div className="text-sm font-semibold">{day.label}</div>
            <img
              src={day.iconUrl.startsWith("http") ? day.iconUrl : `https:${day.iconUrl}`}
              alt={`Icon for ${day.label}`}
              className="h-10 w-10"
            />
            <div className="text-sm">{day.temp}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayForecast;
