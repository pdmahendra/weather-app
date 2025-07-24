type AQIResult = {
  level: string;
  colorClass: string;
};

export function getAQIDescription(usEpaIndex: number): AQIResult {
  switch (usEpaIndex) {
    case 1:
      return { level: "Good", colorClass: "bg-green-500 text-white" };
    case 2:
      return { level: "Moderate", colorClass: "bg-yellow-400 text-black" };
    case 3:
      return {
        level: "Unhealthy for Sensitive Groups",
        colorClass: "bg-orange-400 text-white",
      };
    case 4:
      return { level: "Unhealthy", colorClass: "bg-red-500 text-white" };
    case 5:
      return {
        level: "Very Unhealthy",
        colorClass: "bg-purple-600 text-white",
      };
    case 6:
      return { level: "Hazardous", colorClass: "bg-rose-900 text-white" };
    default:
      return { level: "Unknown", colorClass: "bg-gray-500 text-white" };
  }
}
