// Mock weather data for demo mode
export const mockWeatherData = {
  coord: { lon: -73.5673, lat: 45.5017 },
  weather: [
    {
      id: 601,
      main: 'Snow',
      description: 'snow',
      icon: '13d'
    }
  ],
  base: 'stations',
  main: {
    temp: -5.2,
    feels_like: -10.8,
    temp_min: -7.0,
    temp_max: -3.5,
    pressure: 1015,
    humidity: 78
  },
  visibility: 8000,
  wind: {
    speed: 4.5,
    deg: 320
  },
  clouds: {
    all: 90
  },
  dt: 1736689200,
  sys: {
    type: 1,
    id: 718,
    country: 'CA',
    sunrise: 1736683200,
    sunset: 1736716800
  },
  timezone: -18000,
  id: 6077243,
  name: 'Montreal',
  cod: 200
}

// Additional mock data for different cities
export const mockCityData = {
  'Montreal': {
    ...mockWeatherData,
    name: 'Montreal',
    sys: { ...mockWeatherData.sys, country: 'CA' },
    weather: [{ id: 601, main: 'Snow', description: 'light snow', icon: '13d' }],
    main: { temp: -5.2, feels_like: -10.8, temp_min: -7.0, temp_max: -3.5, pressure: 1015, humidity: 78 }
  },
  'Toronto': {
    ...mockWeatherData,
    name: 'Toronto',
    coord: { lon: -79.4163, lat: 43.7001 },
    sys: { ...mockWeatherData.sys, country: 'CA' },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    main: { temp: -2.5, feels_like: -7.2, temp_min: -4.0, temp_max: -1.0, pressure: 1020, humidity: 65 }
  },
  'Vancouver': {
    ...mockWeatherData,
    name: 'Vancouver',
    coord: { lon: -123.1207, lat: 49.2827 },
    sys: { ...mockWeatherData.sys, country: 'CA' },
    weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
    main: { temp: 8.5, feels_like: 6.2, temp_min: 6.0, temp_max: 10.0, pressure: 1012, humidity: 85 }
  },
  'London': {
    ...mockWeatherData,
    name: 'London',
    coord: { lon: -0.1257, lat: 51.5085 },
    sys: { ...mockWeatherData.sys, country: 'GB' },
    weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
    main: { temp: 7.0, feels_like: 4.5, temp_min: 5.0, temp_max: 9.0, pressure: 1018, humidity: 72 }
  },
  'Paris': {
    ...mockWeatherData,
    name: 'Paris',
    coord: { lon: 2.3488, lat: 48.8534 },
    sys: { ...mockWeatherData.sys, country: 'FR' },
    weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
    main: { temp: 9.5, feels_like: 7.8, temp_min: 7.5, temp_max: 11.0, pressure: 1016, humidity: 68 }
  },
  'Tokyo': {
    ...mockWeatherData,
    name: 'Tokyo',
    coord: { lon: 139.6917, lat: 35.6895 },
    sys: { ...mockWeatherData.sys, country: 'JP' },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    main: { temp: 12.0, feels_like: 10.5, temp_min: 10.0, temp_max: 14.0, pressure: 1022, humidity: 55 }
  },
  'New York': {
    ...mockWeatherData,
    name: 'New York',
    coord: { lon: -74.006, lat: 40.7143 },
    sys: { ...mockWeatherData.sys, country: 'US' },
    weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
    main: { temp: 3.5, feels_like: -1.2, temp_min: 1.0, temp_max: 5.5, pressure: 1019, humidity: 60 }
  },
  'Sydney': {
    ...mockWeatherData,
    name: 'Sydney',
    coord: { lon: 151.2073, lat: -33.8679 },
    sys: { ...mockWeatherData.sys, country: 'AU' },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    main: { temp: 28.0, feels_like: 29.5, temp_min: 25.0, temp_max: 31.0, pressure: 1014, humidity: 65 }
  },
  'Notre-Dame-du-Laus': {
    ...mockWeatherData,
    name: 'Notre-Dame-du-Laus',
    coord: { lon: -75.6333, lat: 46.0833 },
    sys: { ...mockWeatherData.sys, country: 'CA' },
    weather: [{ id: 601, main: 'Snow', description: 'moderate snow', icon: '13d' }],
    main: { temp: -12.5, feels_like: -18.2, temp_min: -15.0, temp_max: -10.0, pressure: 1018, humidity: 82 }
  },
  'Notre Dame du Laus': {
    ...mockWeatherData,
    name: 'Notre-Dame-du-Laus',
    coord: { lon: -75.6333, lat: 46.0833 },
    sys: { ...mockWeatherData.sys, country: 'CA' },
    weather: [{ id: 601, main: 'Snow', description: 'moderate snow', icon: '13d' }],
    main: { temp: -12.5, feels_like: -18.2, temp_min: -15.0, temp_max: -10.0, pressure: 1018, humidity: 82 }
  }
}

// Get mock data for a specific city or return default Montreal data
export const getMockWeatherData = (cityName = null) => {
  if (cityName) {
    const normalizedCity = Object.keys(mockCityData).find(
      key => key.toLowerCase() === cityName.toLowerCase()
    )
    return mockCityData[normalizedCity] || mockWeatherData
  }
  return mockWeatherData
}
