import { getAQIDescription } from "@/utils/getAqiDesc";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type AirQuality = {
  [key: string]: number;
};

const AqiComponent = ({ airQuality }: { airQuality: AirQuality | null }) => {
  const aqi = airQuality?.["us-epa-index"] ?? 0;
  const { level, colorClass } = getAQIDescription(aqi);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Air Quality Index</span>
          {airQuality && (
            <span
              className={`px-2 rounded-full text-xs font-medium ${colorClass}`}
            >
              {level}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-y-5 pt-3">
        {!airQuality ? (
          <p className="text-sm col-span-4 text-muted-foreground text-center h-[100px] flex items-center justify-center">
            AQI is available only for the current day.
          </p>
        ) : (
          Object.entries(airQuality).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <p className="text-xs font-medium text-muted-foreground">
                {key.toUpperCase()}
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {value?.toFixed(1)}
              </h2>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AqiComponent;
