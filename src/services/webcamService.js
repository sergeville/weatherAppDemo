// Webcam service for live camera feeds from various cities

/**
 * Webcam data for major cities
 * Using Windy.com webcams (no API key needed for basic usage)
 * and public webcam streams
 */
export const cityWebcams = {
  'Montreal': {
    name: 'Montreal',
    url: 'https://www.youtube.com/embed/kslJX3zDU4U', // Montreal live cam
    source: 'YouTube Live',
    available: true
  },
  'Toronto': {
    name: 'Toronto',
    url: 'https://www.youtube.com/embed/mPXPHLjOqFY', // Toronto live cam
    source: 'YouTube Live',
    available: true
  },
  'Vancouver': {
    name: 'Vancouver',
    url: 'https://www.youtube.com/embed/Z0M8jwM3ysI', // Vancouver live cam
    source: 'YouTube Live',
    available: true
  },
  'New York': {
    name: 'New York',
    url: 'https://www.youtube.com/embed/AdUw5RdyZxI', // Times Square live
    source: 'YouTube Live',
    available: true
  },
  'London': {
    name: 'London',
    url: 'https://www.youtube.com/embed/Oi58RQO8oNk', // London live cam
    source: 'YouTube Live',
    available: true
  },
  'Paris': {
    name: 'Paris',
    url: 'https://www.youtube.com/embed/8RCMxdZY5zU', // Paris Eiffel Tower
    source: 'YouTube Live',
    available: true
  },
  'Tokyo': {
    name: 'Tokyo',
    url: 'https://www.youtube.com/embed/DjdUEyjx8GM', // Tokyo live cam
    source: 'YouTube Live',
    available: true
  },
  'Sydney': {
    name: 'Sydney',
    url: 'https://www.youtube.com/embed/G02bpIFg7Ww', // Sydney Harbour
    source: 'YouTube Live',
    available: true
  }
}

/**
 * Get webcam URL for a city
 * @param {string} cityName - City name
 * @returns {object|null} - Webcam data or null if not available
 */
export const getWebcamForCity = (cityName) => {
  // Normalize city name
  const normalizedCity = Object.keys(cityWebcams).find(
    key => key.toLowerCase() === cityName.toLowerCase()
  )

  return normalizedCity ? cityWebcams[normalizedCity] : null
}

/**
 * Check if webcam is available for a city
 * @param {string} cityName - City name
 * @returns {boolean} - True if webcam available
 */
export const hasWebcam = (cityName) => {
  return getWebcamForCity(cityName) !== null
}
