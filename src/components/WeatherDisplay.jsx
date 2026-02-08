import { useState, useEffect } from 'react'
import WebcamModal from './WebcamModal'
import WeatherRadar from './WeatherRadar'
import { getWebcamForCity } from '../services/webcamService'
import { getWeatherBackground } from '../weatherImages'
import { fetchWeatherBackground } from '../services/unsplashService'

// --- Pure CSS Particle System ---
const WeatherParticles = ({ condition }) => {
  if (!condition) return null;
  
  const type = condition.toLowerCase();
  const particles = [];
  const count = type.includes('rain') ? 50 : type.includes('snow') ? 50 : 0;
  
  if (count === 0) return null;

  for (let i = 0; i < count; i++) {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -20}%`,
      animationDuration: `${Math.random() * 1 + 0.5}s`,
      animationDelay: `${Math.random() * 2}s`
    };
    
    particles.push(
      <div 
        key={i} 
        className={`particle ${type.includes('rain') ? 'rain-drop' : 'snow-flake'}`}
        style={style}
      />
    );
  }

  return <div className="particles-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>{particles}</div>;
};

function WeatherDisplay({ weather, location, isDemoMode = false }) {
  const [showWebcam, setShowWebcam] = useState(false)
  const [showRadar, setShowRadar] = useState(false)
  const [cardBackgroundImage, setCardBackgroundImage] = useState(null)

  const cityName = weather.name
  const webcamData = getWebcamForCity(cityName)
  const { lat, lon } = weather.coord

  // Refined condition logic: treat few clouds as Clear (Sunny)
  const cloudiness = weather.clouds ? weather.clouds.all : 0;
  const weatherMain = (weather.weather[0].main === 'Clouds' && cloudiness < 20) 
    ? 'Clear' 
    : weather.weather[0].main;

  // Fetch dynamic background for the card
  useEffect(() => {
    // Try to fetch dynamic Unsplash image using the refined condition
    fetchWeatherBackground(weatherMain, cityName).then(imageUrl => {
      if (imageUrl) {
        setCardBackgroundImage(imageUrl)
      } else {
        // Fallback to stock images
        setCardBackgroundImage(getWeatherBackground(weatherMain))
      }
    })
  }, [weather, cityName, weatherMain])
  
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

  // Card style with background image
  // If no image, we let the CSS class handle the glass/dark background
  const cardStyle = cardBackgroundImage ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${cardBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {}

  return (
    <div className="weather-card" style={cardStyle}>
      <WeatherParticles condition={weatherMain} />
      
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
          <div className="detail-text">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather.wind.speed} m/s</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div className="detail-text">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <div className="detail-text">
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🔽</span>
          <div className="detail-text">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.main.pressure} hPa</p>
          </div>
        </div>

        {/* Precipitation (Snow/Rain) */}
        {(weather.snow || weather.rain) && (
          <div className="detail-item">
            <span className="detail-icon">{weather.snow ? '❄️' : '🌧️'}</span>
            <div className="detail-text">
              <p className="detail-label">Precipitation</p>
              <p className="detail-value">
                {weather.snow ? (
                  weather.snow['1h'] ? `${weather.snow['1h']} cm (1h)` :
                  weather.snow['3h'] ? `${weather.snow['3h']} cm (3h)` : 'Light snow'
                ) : (
                  weather.rain['1h'] ? `${weather.rain['1h']} mm (1h)` :
                  weather.rain['3h'] ? `${weather.rain['3h']} mm (3h)` : 'Light rain'
                )}
              </p>
            </div>
          </div>
        )}

        {/* Visibility */}
        {weather.visibility && (
          <div className="detail-item">
            <span className="detail-icon">👁️</span>
            <div className="detail-text">
              <p className="detail-label">Visibility</p>
              <p className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        )}
      </div>

      <div className="sun-times">
        <div className="sun-item">
          <span>🌅</span>
          <span>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
        <div className="sun-item">
          <span>🌇</span>
          <span>{new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        {webcamData && (
          <button
            className="webcam-btn"
            onClick={() => setShowWebcam(true)}
            title="View live webcam from this location"
          >
            <span>📹</span> Live View
          </button>
        )}

        <button
          className="webcam-btn"
          onClick={() => setShowRadar(true)}
          title="View live weather radar and satellite"
        >
          <span>🌍</span> Radar
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
