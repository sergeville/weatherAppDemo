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
- **App.jsx**: Main application component handling state and API calls
- **WeatherDisplay.jsx**: Weather card component with dynamic backgrounds and icons

### Key Features
- **Geolocation**: Automatically detects user's location on load
- **City Search**: Manual city search with Enter key submission
- **Dynamic Theming**: Background gradients change based on weather conditions (Clear, Clouds, Rain, Snow, etc.)
- **Weather Icons**: Emoji-based weather representations
- **Responsive Design**: Mobile-friendly layout with media queries

### API Integration Pattern
- Uses `fetch` API for OpenWeatherMap requests
- Supports both coordinate-based and city-based searches
- Metric units (Celsius) by default
- Error handling for failed requests and missing API keys

### State Management
- React `useState` for weather data, loading, and error states
- `useEffect` hook triggers geolocation on component mount
- No external state management library (vanilla React state)
