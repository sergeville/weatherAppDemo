// Unsplash API service for dynamic weather-based images

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

/**
 * Fetch a random photo from Unsplash based on query
 * @param {string} query - Search query (e.g., "snow montreal" or "rain")
 * @returns {Promise<string|null>} - Image URL or null if failed
 */
export const fetchUnsplashImage = async (query) => {
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'demo') {
    console.log('No Unsplash API key configured, using fallback images')
    return null
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Unsplash image')
    }

    const data = await response.json()
    return data.urls.regular // Returns 1080px image URL
  } catch (error) {
    console.error('Unsplash API error:', error)
    return null
  }
}

/**
 * Get weather-based search query
 * @param {string} weatherCondition - Weather condition (Clear, Rain, Snow, etc.)
 * @param {string} cityName - City name for context
 * @returns {string} - Search query for Unsplash
 */
export const getWeatherSearchQuery = (weatherCondition, cityName = '') => {
  const conditionMap = {
    Clear: 'sunny clear sky blue',
    Clouds: 'cloudy sky clouds',
    Rain: 'rain rainy weather',
    Drizzle: 'drizzle light rain',
    Thunderstorm: 'thunderstorm lightning storm',
    Snow: 'snow winter snowy',
    Mist: 'misty fog morning',
    Fog: 'foggy fog mist',
    Haze: 'hazy atmosphere'
  }

  const weatherQuery = conditionMap[weatherCondition] || 'weather sky'

  // Combine with city name for more relevant results
  return cityName ? `${weatherQuery} ${cityName}` : weatherQuery
}

/**
 * Fetch weather-appropriate background image
 * @param {string} weatherCondition - Current weather condition
 * @param {string} cityName - City name (optional)
 * @returns {Promise<string|null>} - Image URL or null
 */
export const fetchWeatherBackground = async (weatherCondition, cityName = '') => {
  const query = getWeatherSearchQuery(weatherCondition, cityName)
  return await fetchUnsplashImage(query)
}
