import { Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AstroProps {
  astro: {
    sunrise: string;
    sunset: string;
  };
}

const AstroComponent = ({ astro }: AstroProps) => {
  return (
    <Card className="h-full ">
      <CardHeader className="pb-2">
        <CardTitle>Sunrise & Sunset</CardTitle>
      </CardHeader>

      <CardContent className="pt-3 space-y-5">
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col items-center">
            <p className="text-xs font-medium text-muted-foreground">Sunrise</p>
            <h2 className="text-3xl font-semibold">{astro.sunrise}</h2>
          </div>
          <Sunrise className="size-12" />
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col items-center">
            <p className="text-xs font-medium text-muted-foreground">Sunset</p>
            <h2 className="text-3xl font-semibold">{astro.sunset}</h2>
          </div>
          <Sunset className="size-12" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AstroComponent;
