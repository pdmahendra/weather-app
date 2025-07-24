"use client";

import { AreaChart, Area, XAxis, CartesianGrid } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface HourlyTempChartProps {
  hourly: {
    time: string;
    temp: number;
  }[];
}

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "#4f46e5",
  },
};

const HourlyTempChart = ({ hourly }: HourlyTempChartProps) => {
  return (
    <Card className="md:p-4">
      <CardHeader className="pb-2">
        <CardTitle>Temperature</CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <AreaChart
          data={hourly}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={6}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
};

export default HourlyTempChart;
