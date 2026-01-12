import { useState, useEffect } from 'react'
import WeatherDisplay from './components/WeatherDisplay'
import { getMockWeatherData } from './mockData'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState('')
  const [demoMode, setDemoMode] = useState(false)

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo'
  const hasValidApiKey = API_KEY && API_KEY !== 'demo' && API_KEY !== 'your_api_key_here'

  // Simulate API delay for demo mode
  const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

  const loadDemoWeather = async (cityName = null) => {
    setLoading(true)
    setError(null)
    await simulateDelay()

    const mockData = getMockWeatherData(cityName)
    setWeather(mockData)
    setLocation(`${mockData.name}, ${mockData.sys.country}`)
    setLoading(false)
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    if (demoMode || !hasValidApiKey) {
      await loadDemoWeather()
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `API Error: ${response.status}`)
      }

      const data = await response.json()
      setWeather(data)
      setLocation(`${data.name}, ${data.sys.country}`)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const fetchWeatherByCity = async (city) => {
    setLoading(true)
    setError(null)

    if (demoMode || !hasValidApiKey) {
      await loadDemoWeather(city)
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'City not found')
      }

      const data = await response.json()
      setWeather(data)
      setLocation(`${data.name}, ${data.sys.country}`)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const getCurrentLocation = () => {
    if (demoMode || !hasValidApiKey) {
      loadDemoWeather()
      return
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude)
        },
        (err) => {
          setError('Unable to retrieve your location')
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
    }
  }

  const toggleDemoMode = () => {
    setDemoMode(!demoMode)
    setWeather(null)
    setError(null)
    setLoading(true)
  }

  useEffect(() => {
    // Auto-enable demo mode if no valid API key
    if (!hasValidApiKey) {
      setDemoMode(true)
    }
    getCurrentLocation()
  }, [demoMode])

  return (
    <div className="app">
      <div className="container">
        {/* Demo Mode Banner */}
        {demoMode && (
          <div className="demo-banner">
            🎭 Demo Mode Active - Using Mock Weather Data
            {hasValidApiKey && (
              <button onClick={toggleDemoMode} className="toggle-demo-btn">
                Switch to Live Data
              </button>
            )}
          </div>
        )}

        {/* API Key Missing Banner */}
        {!hasValidApiKey && !demoMode && (
          <div className="warning-banner">
            ⚠️ No API key configured - Demo mode available
          </div>
        )}

        <header className="header">
          <h1>Weather App</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder={demoMode ? "Try: Montreal, Toronto, Paris, Tokyo..." : "Enter city name..."}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  fetchWeatherByCity(e.target.value)
                  e.target.value = ''
                }
              }}
              className="search-input"
            />
            <button onClick={getCurrentLocation} className="location-btn">
              📍 {demoMode ? 'Demo Location' : 'Use My Location'}
            </button>
            {hasValidApiKey && (
              <button onClick={toggleDemoMode} className="location-btn demo-toggle-btn">
                {demoMode ? '🌐 Use Live API' : '🎭 Try Demo'}
              </button>
            )}
          </div>
        </header>

        <main className="main-content">
          {loading && <div className="loading">Loading weather data...</div>}

          {error && (
            <div className="error">
              <p><strong>Error:</strong> {error}</p>
              {!hasValidApiKey && (
                <div className="api-hint">
                  <h3>🔑 Want Live Weather Data?</h3>
                  <p style={{ marginBottom: '15px' }}>
                    You're currently using demo mode with mock data. To get real weather data:
                  </p>
                  <ol style={{ textAlign: 'left', marginTop: '15px' }}>
                    <li>Visit <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap API</a></li>
                    <li>Sign up for a free account</li>
                    <li>Get your API key</li>
                    <li>Add it to <code>.env.local</code>:
                      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', marginTop: '8px', color: '#333' }}>
VITE_WEATHER_API_KEY=your_actual_key_here
                      </pre>
                    </li>
                    <li>Restart the dev server: <code>npm run dev</code></li>
                  </ol>
                  <button
                    onClick={() => { setError(null); loadDemoWeather(); }}
                    className="try-demo-btn"
                    style={{
                      marginTop: '20px',
                      padding: '12px 24px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    Continue with Demo Mode
                  </button>
                </div>
              )}
            </div>
          )}

          {weather && !loading && (
            <WeatherDisplay weather={weather} location={location} isDemoMode={demoMode} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
