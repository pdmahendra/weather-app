# Weather-app (WeatherNow - PWA)

A Progressive Web App (PWA) that provides real-time weather updates, hourly forecasts, and 3-day predictions. Users can search cities worldwide, save favorite locations, and view weather data even when offline.

---

## Features

- **Real-Time Weather Data:** Current temperature, humidity, wind speed, and conditions.
- **3-Day Forecast:** Daily high/low temperatures with weather icons.
- **Hourly Forecast:** Visual breakdown of weather changes throughout the day.
- **Location Management:**
  - Search and save multiple cities.
  - Set and use current location via device GPS.
  - Favorite cities for quick access.
- **Offline Mode:** Previously fetched weather data is cached and displayed when offline.
- **Cross-Platform PWA:** Installable on desktop and mobile devices.

---

## Tech Stack

- **Framework:** React 19 (Vite + TypeScript)
- **State Management:** Zustand
- **Data Fetching:** React Query + Axios
- **Styling:** TailwindCSS + Lucide Icons
- **PWA:** `vite-plugin-pwa`
- **API Provider:** WeatherAPI.com

---

## How to Run the Project

1. Clone the Repository

```bash
git clone <REPO_URL>
cd weather-app


2. Install Dependencies
npm install

3. Environment Variables
VITE_WEATHER_API_KEY=your_api_key_here

4. Run in Development
npm run dev

5. Build for Production
npm run build
npm run preview

Assumptions & Trade-offs
Using free tier Weather API (limited requests e.g 3 days forecast only).
Offline mode uses last fetched data (not background sync).
Location search limited to WeatherAPI city database.
Location services are permission-based — fallback to default location (Malta) if denied.

Improvements (If Given More Time)
Add weather maps (radar, precipitation) for visual context.
Implement background sync to refresh weather automatically when online.