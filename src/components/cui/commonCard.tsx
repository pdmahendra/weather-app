import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Droplet, Gauge, Eye, Navigation, Thermometer } from "lucide-react";

const icons = {
  drop: Droplet,
  gauge: Gauge,
  eye: Eye,
  navigation: Navigation,
  thermometer: Thermometer,
};

const CommonCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: keyof typeof icons;
}) => {
  const Icon = icons[icon];

  return (
    <Card className="h-full">
      {/* Top-left title */}
      <CardHeader className="pb-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      {/* Bottom row: icon left, value right */}
      <CardContent className="pt-3 flex justify-between items-center">
        <Icon className="size-6 text-muted-foreground" />
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default CommonCard;
