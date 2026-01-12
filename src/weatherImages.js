// Weather condition to background image mapping
// Using Unsplash source URLs for free high-quality images

export const weatherBackgroundImages = {
  Clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920&q=80', // Clear blue sky
  Clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80', // Cloudy sky
  Rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1920&q=80', // Rainy window
  Drizzle: 'https://images.unsplash.com/photo-1556485689-33e55ab56127?w=1920&q=80', // Light rain
  Thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920&q=80', // Lightning storm
  Snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=80', // Snowy landscape
  Mist: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&q=80', // Misty morning
  Fog: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1920&q=80', // Foggy scene
  Haze: 'https://images.unsplash.com/photo-1500740516770-92bd004b996e?w=1920&q=80', // Hazy atmosphere
}

// Get background image URL for weather condition
export const getWeatherBackground = (condition) => {
  return weatherBackgroundImages[condition] || weatherBackgroundImages.Clear
}

// Get background style with overlay
export const getBackgroundStyle = (condition) => {
  const imageUrl = getWeatherBackground(condition)
  return {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }
}
