# Weather App Demo

A beautiful, responsive React weather application that displays current weather conditions for any location worldwide.

## Features

- 🌍 Automatic geolocation detection
- 🔍 Search weather by city name
- 🎨 Dynamic backgrounds based on weather conditions
- 📱 Fully responsive design
- 🌡️ Detailed weather information (temperature, humidity, wind speed, pressure)
- 🌅 Sunrise and sunset times

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   ```bash
   cp .env.local.example .env.local
   ```
   Then add your [OpenWeatherMap API key](https://openweathermap.org/api) to `.env.local`

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- React 19.2.3
- Vite 7.3.1
- OpenWeatherMap API
- CSS3 with animations and gradients

## Project Structure

```
weatherAppDemo/
├── src/
│   ├── components/
│   │   └── WeatherDisplay.jsx
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

## API Key Setup

This app uses the OpenWeatherMap API. To get your free API key:

1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env.local` file

## License

MIT
