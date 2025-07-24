import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface CurrentTempProps {
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
    last_updated?: string;
  };
  location: {
    name: string;
    country: string;
  };
  date?: string;
}

const CurrentTemp = ({ current, location, date }: CurrentTempProps) => {
  const { temp_c, condition, last_updated } = current;
  const { name, country } = location;

  const rawDateStr = date || last_updated || "";
  const displayDate = new Date(rawDateStr);
  const isToday = displayDate.toDateString() === new Date().toDateString();

  const formattedDate = new Date(date || last_updated || "").toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Card className="h-full ">
      <CardHeader className="pb-2">
        <CardTitle>{isToday ? "Now" : `Weather on ${formattedDate}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-4xl font-semibold">{temp_c.toFixed(1)}°C</h1>
          <div>
            {condition?.icon ? (
              <img
                src={condition.icon}
                alt={condition.text}
                className="h-10 w-10"
              />
            ) : (
              "🌤️"
            )}
          </div>
        </div>
        <p className="text-md font-medium">{condition.text}</p>
        <Separator className="my-3" />

        <p className="text-sm text-muted-foreground font-medium">
          {formattedDate}
        </p>
        <p className="text-sm text-muted-foreground font-medium">
          {name}, {country}
        </p>
      </CardContent>
    </Card>
  );
};

export default CurrentTemp;
