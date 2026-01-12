import { useState, useEffect } from 'react'
import WeatherDisplay from './components/WeatherDisplay'
import { getMockWeatherData } from './mockData'
import { getBackgroundStyle } from './weatherImages'
import { fetchWeatherBackground } from './services/unsplashService'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState('')
  const [demoMode, setDemoMode] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo'
  const hasValidApiKey = API_KEY && API_KEY !== 'demo' && API_KEY !== 'your_api_key_here'

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory')
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory)
        setSearchHistory(history)
      } catch (e) {
        console.error('Failed to load search history:', e)
      }
    }
  }, [])

  // Save search to history
  const addToSearchHistory = (cityName) => {
    if (!cityName || cityName.trim() === '') return

    setSearchHistory(prevHistory => {
      // Remove duplicates and add to the beginning
      const filtered = prevHistory.filter(item => item.toLowerCase() !== cityName.toLowerCase())
      const newHistory = [cityName, ...filtered].slice(0, 100) // Limit to 100 entries

      // Save to localStorage
      localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory))

      return newHistory
    })
  }

  // Get filtered suggestions based on input
  const getSuggestions = () => {
    if (!searchInput || searchInput.trim() === '') return searchHistory.slice(0, 10)

    const input = searchInput.toLowerCase()
    return searchHistory
      .filter(city => city.toLowerCase().includes(input))
      .slice(0, 10)
  }

  // Simulate API delay for demo mode
  const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

  const loadDemoWeather = async (cityName = null) => {
    setLoading(true)
    setError(null)

    console.log('🎭 Loading demo weather for:', cityName || 'default (Montreal)')
    await simulateDelay()

    const mockData = getMockWeatherData(cityName)
    console.log('✅ Demo data loaded:', mockData.name)

    setWeather(mockData)
    setLocation(`${mockData.name}, ${mockData.sys.country}`)
    setLoading(false)
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    console.log('📍 Fetching weather by coordinates:', lat, lon)
    console.log('📊 Demo mode:', demoMode)
    console.log('🔑 API key configured:', hasValidApiKey)

    if (demoMode || !hasValidApiKey) {
      console.log('🎭 Using demo mode for coordinates')
      await loadDemoWeather()
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      console.log('🌐 API Request URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'))

      const response = await fetch(url)
      console.log('📡 API Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ API Error:', errorData)
        throw new Error(errorData.message || `API Error: ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Weather data received for:', data.name)
      console.log('📊 Full weather data:', data)

      setWeather(data)
      setLocation(`${data.name}, ${data.sys.country}`)
      setLoading(false)
    } catch (err) {
      console.error('💥 Error fetching weather by coords:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  const fetchWeatherByCity = async (city) => {
    setLoading(true)
    setError(null)

    console.log('🔍 Search initiated for:', city)
    console.log('📊 Demo mode:', demoMode)
    console.log('🔑 API key configured:', hasValidApiKey)

    if (demoMode || !hasValidApiKey) {
      console.log('🎭 Using demo mode for:', city)
      await loadDemoWeather(city)
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      console.log('🌐 API Request URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'))

      const response = await fetch(url)
      console.log('📡 API Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ API Error:', errorData)
        throw new Error(`City not found: "${city}". Try the exact city name (e.g., "Notre-Dame-du-Laus")`)
      }

      const data = await response.json()
      console.log('✅ Weather data received:', data)

      // Add to search history
      addToSearchHistory(city)

      setWeather(data)
      setLocation(`${data.name}, ${data.sys.country}`)
      setLoading(false)
    } catch (err) {
      console.error('💥 Error fetching weather:', err)
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

  // Fetch Unsplash background image when weather changes
  useEffect(() => {
    if (weather) {
      const cityName = weather.name
      const weatherCondition = weather.weather[0].main

      fetchWeatherBackground(weatherCondition, cityName).then(imageUrl => {
        if (imageUrl) {
          setBackgroundImage(imageUrl)
        }
      })
    }
  }, [weather])

  // Get background style based on current weather
  const appStyle = weather ? (
    backgroundImage ? {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      transition: 'background-image 0.5s ease-in-out'
    } : getBackgroundStyle(weather.weather[0].main)
  ) : {}

  return (
    <div className="app" style={appStyle}>
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
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder={demoMode ? "Try: Montreal, Notre-Dame-du-Laus, Toronto, Paris..." : "Enter city name..."}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchInput.trim()) {
                    fetchWeatherByCity(searchInput)
                    setSearchInput('')
                    setShowSuggestions(false)
                  }
                }}
                className="search-input"
              />

              {/* Search History Suggestions */}
              {showSuggestions && getSuggestions().length > 0 && (
                <div className="search-suggestions">
                  {getSuggestions().map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        fetchWeatherByCity(suggestion)
                        setSearchInput('')
                        setShowSuggestions(false)
                      }}
                    >
                      <span className="suggestion-icon">🕐</span>
                      <span className="suggestion-text">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
