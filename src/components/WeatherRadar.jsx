import { useEffect } from 'react'

function WeatherRadar({ lat, lon, onClose }) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo'

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // OpenWeatherMap weather layers
  const layers = [
    { id: 'precipitation_new', name: 'Precipitation', icon: '🌧️' },
    { id: 'clouds_new', name: 'Cloud Cover', icon: '☁️' },
    { id: 'temp_new', name: 'Temperature', icon: '🌡️' },
    { id: 'wind_new', name: 'Wind Speed', icon: '💨' }
  ]

  return (
    <div className="webcam-modal-overlay" onClick={onClose}>
      <div className="webcam-modal-content radar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="webcam-modal-header">
          <h3>🌍 Live Weather Radar & Satellite</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="radar-container">
          {/* Using Windy.com embed for interactive weather radar */}
          <iframe
            src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=8&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
            frameBorder="0"
            className="radar-iframe"
            title="Weather Radar"
          />
        </div>

        <div className="webcam-modal-footer">
          <p><strong>Interactive Weather Radar</strong></p>
          <p className="webcam-note">
            🌐 Use controls to switch between radar, clouds, temperature, and wind layers
          </p>
          <p className="webcam-note">
            📡 Real-time data from Windy.com - Click and drag to explore
          </p>

          {API_KEY !== 'demo' && (
            <div className="weather-layers-info">
              <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#666' }}>
                <strong>Available OpenWeatherMap Layers:</strong>
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                {layers.map(layer => (
                  <span key={layer.id} style={{
                    background: '#e0e0e0',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}>
                    {layer.icon} {layer.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeatherRadar
