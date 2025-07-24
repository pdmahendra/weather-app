// import { Card, CardContent } from "../ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";

// const hourlyData = [
//   { time: "3 AM", temp: "32.7°C", icon: "☁️" },
//   { time: "6 AM", temp: "33.5°C", icon: "☁️" },
//   { time: "9 PM", temp: "32.9°C", icon: "☁️" },
//   { time: "12 PM", temp: "31.6°C", icon: "☁️" },
//   { time: "6 PM", temp: "30.6°C", icon: "☁️" },
//   { time: "9 PM", temp: "29.5°C", icon: "🌙" },
//   { time: "12 AM", temp: "28.6°C", icon: "🌙" },
//   { time: "3 AM", temp: "27.1°C", icon: "🌙" },
//   { time: "6 AM", temp: "32.7°C", icon: "☁️" },
//   { time: "9 AM", temp: "33.5°C", icon: "☁️" },
//   { time: "12 PM", temp: "32.9°C", icon: "☁️" },
//   { time: "3 PM", temp: "31.6°C", icon: "☁️" },
//   { time: "6 PM", temp: "30.6°C", icon: "☁️" },
//   { time: "9 PM", temp: "29.5°C", icon: "🌙" },
//   { time: "12 AM", temp: "28.6°C", icon: "🌙" },
//   { time: "3 AM", temp: "27.1°C", icon: "🌙" },
// ];

// const TodayHourly = () => {
//   return (
//     <Carousel opts={{ align: "start" }} className="max-w-7xl mx-auto">
//       <CarouselContent className="">
//         {hourlyData.map((hour, index) => (
//           <CarouselItem key={index} className="basis-[130px]">
//             <Card className="bg-muted/30 text-center shadow-sm">
//               <CardContent className="p-4 space-y-2">
//                 <div className="text-sm font-semibold">{hour.time}</div>
//                 <div className="text-2xl">{hour.icon}</div>
//                 <div className="text-sm">{hour.temp}</div>
//               </CardContent>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// };

// export default TodayHourly;

