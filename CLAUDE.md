# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a React-based weather application that displays current weather conditions for any location worldwide. The app uses the OpenWeatherMap API and features automatic geolocation detection.

**Tech Stack:**
- React 19.2.3
- Vite 7.3.1 (build tool and dev server)
- OpenWeatherMap API for weather data
- Native Geolocation API for location detection

## Getting Started

This repository was created using the `mkproject` command, which automatically initializes git repositories.

### The `mkproject` Workflow

The system has a custom `mkproject` shell function that automates project setup. When creating new projects, it:

1. **Automatically runs `git init`** - Git initialization is built into the command
2. Creates a comprehensive `.gitignore` file suitable for Node.js/React/Next.js/Python projects
3. Offers 6 project types:
   - Plain (git + .gitignore only)
   - Node.js (npm init)
   - React (Create React App)
   - Next.js (create-next-app with TypeScript)
   - TypeScript Node (npm init + TypeScript setup)
   - Python (venv + VS Code configuration)
4. Automatically opens the project in VS Code if available

**Usage**: `mkproject <project-name>`

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and add it to `.env.local`:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Common Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Create production build
npm run preview  # Preview production build locally
```

## Architecture

### Component Structure
- **App.jsx**: Main application component handling state, API calls, and background image management
- **WeatherDisplay.jsx**: Weather card with dynamic backgrounds, icons, webcam, and radar buttons
- **WebcamModal.jsx**: Modal component for displaying live webcam feeds
- **WeatherRadar.jsx**: Modal component for interactive weather radar/satellite view

### Services
- **unsplashService.js**: Fetches dynamic weather-based images from Unsplash API
- **webcamService.js**: Manages webcam feed URLs for 8 major cities

### Key Features

#### Visual Layers (4 Implementations)
1. **Stock Images** (`weatherImages.js`): Curated Unsplash URLs for each weather condition
2. **Dynamic Unsplash**: Fetches fresh images based on location + weather (requires API key)
3. **Live Webcams**: YouTube Live embeds from major cities (Montreal, Toronto, Vancouver, NYC, London, Paris, Tokyo, Sydney)
4. **Weather Radar**: Windy.com embed with interactive radar, clouds, temperature, and wind layers

#### Core Features
- **Geolocation**: Automatically detects user's location on load
- **City Search**: Manual city search with Enter key submission
- **Search History**: Autocomplete dropdown with last 100 searches stored in localStorage
- **Demo Mode**: Mock data for 9 cities when no API key configured (including Notre-Dame-du-Laus, QC)
- **Dynamic Backgrounds**: Multiple fallback layers (Unsplash → Stock → Gradient)
- **Weather Icons**: Emoji-based weather representations
- **Precipitation Display**: Shows snow/rain accumulation (1h and 3h measurements)
- **Visibility Tracking**: Displays atmospheric visibility in kilometers
- **Responsive Design**: Mobile-friendly layout with media queries
- **Modal System**: Webcam and radar viewers with keyboard shortcuts (Escape to close)
- **Debugging**: Comprehensive console.log tracing for API calls and errors

### API Integration Pattern
- **OpenWeatherMap**: Live weather data (coordinate-based and city-based searches)
- **Unsplash**: Dynamic background images (optional, falls back to stock images)
- **Windy.com**: Embedded radar/satellite (no API key needed)
- **YouTube Live**: Webcam streams (embedded iframes)
- All APIs use `fetch` with error handling
- Metric units (Celsius) by default

### State Management
- React `useState` for weather data, loading, error, demo mode, and background images
- Multiple `useEffect` hooks:
  - Component mount: Auto-enable demo mode and fetch location
  - Weather changes: Fetch Unsplash background image
  - Search history: Load from localStorage on mount
- **localStorage Integration**:
  - `weatherSearchHistory`: Stores last 100 city searches as JSON array
  - Persists across browser sessions
  - Automatically removes duplicates (case-insensitive)
  - FIFO (First In, First Out) when limit reached
- No external state management library (vanilla React state)

### Search History Implementation
- **Autocomplete Dropdown**: Shows up to 10 suggestions filtered by user input
- **Smart Filtering**: Case-insensitive substring matching
- **Instant Search**: Click suggestion to immediately fetch weather
- **Keyboard Support**: Enter key to search from input field
- **UX Details**:
  - 200ms blur delay for better click handling
  - Smooth slideDown animation (0.2s)
  - Clock icon (🕐) indicates historical searches
  - Hover effects with background color change
