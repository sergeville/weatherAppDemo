import { useState, useEffect } from 'react'
import WebcamModal from './WebcamModal'
import WeatherRadar from './WeatherRadar'
import { getWebcamForCity } from '../services/webcamService'
import { getWeatherBackground } from '../weatherImages'
import { fetchWeatherBackground } from '../services/unsplashService'

function WeatherDisplay({ weather, location, isDemoMode = false }) {
  const [showWebcam, setShowWebcam] = useState(false)
  const [showRadar, setShowRadar] = useState(false)
  const [cardBackgroundImage, setCardBackgroundImage] = useState(null)

  const cityName = weather.name
  const webcamData = getWebcamForCity(cityName)
  const { lat, lon } = weather.coord

  // Fetch dynamic background for the card
  useEffect(() => {
    const weatherCondition = weather.weather[0].main

    // Try to fetch dynamic Unsplash image
    fetchWeatherBackground(weatherCondition, cityName).then(imageUrl => {
      if (imageUrl) {
        setCardBackgroundImage(imageUrl)
      } else {
        // Fallback to stock images
        setCardBackgroundImage(getWeatherBackground(weatherCondition))
      }
    })
  }, [weather, cityName])
  const getWeatherIcon = (condition) => {
    const iconMap = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Fog: '🌫️',
      Haze: '🌫️'
    }
    return iconMap[condition] || '🌤️'
  }

  const getBackgroundGradient = (condition) => {
    const gradientMap = {
      Clear: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      Clouds: 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
      Rain: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
      Drizzle: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      Thunderstorm: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
      Snow: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)',
      Mist: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
      Fog: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
      Haze: 'linear-gradient(135deg, #ada996 0%, #f2f2f2 100%)'
    }
    return gradientMap[condition] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }

  const weatherMain = weather.weather[0].main

  // Card style with background image
  const cardStyle = cardBackgroundImage ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${cardBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {
    background: getBackgroundGradient(weatherMain)
  }

  return (
    <div className="weather-card" style={cardStyle}>
      {isDemoMode && (
        <div className="demo-badge">
          🎭 Demo Data
        </div>
      )}
      <div className="location-info">
        <h2>{location}</h2>
        <p className="date">{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>

      <div className="weather-main">
        <div className="weather-icon-large">
          {getWeatherIcon(weatherMain)}
        </div>
        <div className="temperature">
          <span className="temp-value">{Math.round(weather.main.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="weather-description">{weather.weather[0].description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div>
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather.wind.speed} m/s</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <div>
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🔽</span>
          <div>
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.main.pressure} hPa</p>
          </div>
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-item">
          <span>🌅</span>
          <span>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
        <div className="sun-item">
          <span>🌇</span>
          <span>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {webcamData && (
          <button
            className="webcam-btn"
            onClick={() => setShowWebcam(true)}
            title="View live webcam from this location"
          >
            📹 View Live Webcam
          </button>
        )}

        <button
          className="webcam-btn"
          onClick={() => setShowRadar(true)}
          title="View live weather radar and satellite"
        >
          🌍 View Weather Radar
        </button>
      </div>

      {/* Webcam Modal */}
      {showWebcam && (
        <WebcamModal
          webcamData={webcamData}
          onClose={() => setShowWebcam(false)}
        />
      )}

      {/* Weather Radar Modal */}
      {showRadar && (
        <WeatherRadar
          lat={lat}
          lon={lon}
          onClose={() => setShowRadar(false)}
        />
      )}
    </div>
  )
}

export default WeatherDisplay
