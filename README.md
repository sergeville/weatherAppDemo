# Weather App Demo

A beautiful, feature-rich React weather application that displays current weather conditions with real-time visual representations from any location worldwide.

## Features

### Core Weather Data
- 🌍 Automatic geolocation detection
- 🔍 Search weather by city name
- 🌡️ Detailed weather information (temperature, humidity, wind speed, pressure)
- 🌅 Sunrise and sunset times
- 📱 Fully responsive design

### Visual Features (4 Layers!)
1. **🎨 Weather-Based Stock Images** - Curated backgrounds matching current conditions
2. **📸 Dynamic Unsplash Integration** - Fresh location-specific weather images (optional)
3. **📹 Live Webcam Feeds** - Real-time camera views from major cities
4. **🌍 Weather Radar & Satellite** - Interactive live radar with multiple layers

### Additional Features
- 🎭 Demo mode with mock data (works without API keys)
- 🔄 Toggle between demo and live data
- ⚡ Smooth animations and transitions
- 🌈 Weather-adaptive color gradients

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API keys (optional for demo mode):**
   ```bash
   cp .env.example .env.local
   ```
   Then add your API keys to `.env.local`:
   - **OpenWeatherMap** (for live weather): [Get key](https://openweathermap.org/api)
   - **Unsplash** (for dynamic images, optional): [Get key](https://unsplash.com/developers)

   **Note:** App works in demo mode without any API keys!

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Frontend:** React 19.2.3, Vite 7.3.1
- **APIs:**
  - OpenWeatherMap (weather data)
  - Unsplash (dynamic images, optional)
  - Windy.com (radar/satellite embed)
  - YouTube Live (webcam streams)
- **Styling:** CSS3 with animations, gradients, and glassmorphism

## Project Structure

```
weatherAppDemo/
├── src/
│   ├── components/
│   │   ├── WeatherDisplay.jsx   # Main weather card
│   │   ├── WebcamModal.jsx      # Live webcam viewer
│   │   └── WeatherRadar.jsx     # Radar/satellite overlay
│   ├── services/
│   │   ├── unsplashService.js   # Unsplash API integration
│   │   └── webcamService.js     # Webcam feed data
│   ├── styles/
│   │   └── App.css              # All styling
│   ├── weatherImages.js         # Stock image mappings
│   ├── mockData.js              # Demo mode data
│   ├── App.jsx                  # Main app logic
│   └── main.jsx                 # Entry point
├── index.html
├── vite.config.js
└── .env.local                   # API keys (create from .env.example)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

## API Key Setup

### Demo Mode (No Keys Required)
The app automatically runs in demo mode with mock data for 8 major cities if no API keys are configured. Try searching for: Montreal, Toronto, Vancouver, London, Paris, Tokyo, New York, Sydney.

### Live Weather (OpenWeatherMap - Required)
1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add to `.env.local`: `VITE_WEATHER_API_KEY=your_key_here`

### Dynamic Images (Unsplash - Optional)
1. Visit [https://unsplash.com/developers](https://unsplash.com/developers)
2. Create a developer account
3. Create a new application
4. Add to `.env.local`: `VITE_UNSPLASH_ACCESS_KEY=your_key_here`

**Note:** Without Unsplash key, the app uses curated stock images instead.

## How to Use Visual Features

1. **Background Images** - Automatically change based on weather
2. **Live Webcam** - Click "📹 View Live Webcam" button (available for 8 major cities)
3. **Weather Radar** - Click "🌍 View Weather Radar" for interactive satellite/radar view
4. **Toggle Modes** - Switch between demo and live data anytime

## Cities with Live Webcams

- Montreal, Canada
- Toronto, Canada
- Vancouver, Canada
- New York, USA
- London, UK
- Paris, France
- Tokyo, Japan
- Sydney, Australia

## License

MIT
