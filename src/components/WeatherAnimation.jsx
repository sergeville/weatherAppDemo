import { useEffect, useState } from 'react'
import '../styles/WeatherAnimation.css'

function WeatherAnimation({ weatherCondition }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate particles for snow and rain
    if (weatherCondition === 'Snow' || weatherCondition === 'Rain' || weatherCondition === 'Drizzle') {
      const particleCount = weatherCondition === 'Snow' ? 50 : 100
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: weatherCondition === 'Snow'
          ? Math.random() * 3 + 2  // 2-5s for snow
          : Math.random() * 0.5 + 0.5,  // 0.5-1s for rain
        animationDelay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.5
      }))
      setParticles(newParticles)
    }
  }, [weatherCondition])

  const renderAnimation = () => {
    switch (weatherCondition) {
      case 'Snow':
        return (
          <div className="weather-animation snow-animation">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="snowflake"
                style={{
                  left: `${particle.left}%`,
                  animationDuration: `${particle.animationDuration}s`,
                  animationDelay: `${particle.animationDelay}s`,
                  opacity: particle.opacity
                }}
              >
                ❄
              </div>
            ))}
          </div>
        )

      case 'Rain':
      case 'Drizzle':
        return (
          <div className="weather-animation rain-animation">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="raindrop"
                style={{
                  left: `${particle.left}%`,
                  animationDuration: `${particle.animationDuration}s`,
                  animationDelay: `${particle.animationDelay}s`,
                  opacity: particle.opacity
                }}
              />
            ))}
          </div>
        )

      case 'Thunderstorm':
        return (
          <div className="weather-animation thunderstorm-animation">
            <div className="lightning-flash"></div>
            {particles.map(particle => (
              <div
                key={particle.id}
                className="raindrop heavy"
                style={{
                  left: `${particle.left}%`,
                  animationDuration: `${particle.animationDuration}s`,
                  animationDelay: `${particle.animationDelay}s`,
                  opacity: particle.opacity
                }}
              />
            ))}
          </div>
        )

      case 'Clear':
        return (
          <div className="weather-animation sunny-animation">
            <div className="sun-rays">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="ray" style={{ transform: `rotate(${i * 30}deg)` }} />
              ))}
            </div>
            <div className="sparkles">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        )

      case 'Clouds':
        return (
          <div className="weather-animation clouds-animation">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="floating-cloud"
                style={{
                  top: `${10 + i * 15}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${20 + i * 5}s`
                }}
              >
                ☁️
              </div>
            ))}
          </div>
        )

      case 'Mist':
      case 'Fog':
      case 'Haze':
        return (
          <div className="weather-animation fog-animation">
            <div className="fog-layer fog-layer-1"></div>
            <div className="fog-layer fog-layer-2"></div>
            <div className="fog-layer fog-layer-3"></div>
          </div>
        )

      default:
        return null
    }
  }

  return renderAnimation()
}

export default WeatherAnimation
