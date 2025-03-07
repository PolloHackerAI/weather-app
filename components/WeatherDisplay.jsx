"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"

// Styled components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
`

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0070f3;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WeatherHeader = styled.div`
  text-align: center;
`

const CityName = styled.h2`
  margin-bottom: 8px;
`

const WeatherIcon = styled.div`
  margin: 8px 0;
`

const Temperature = styled.p`
  font-size: 36px;
  font-weight: bold;
  margin: 8px 0;
`

const Description = styled.p`
  color: #666;
  text-transform: capitalize;
  margin-top: 0;
`

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
`

const DetailCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
`

const DetailIcon = styled.div`
  font-size: 24px;
`

const DetailContent = styled.div``

const DetailLabel = styled.p`
  color: #666;
  margin: 0;
  font-size: 14px;
`

const DetailValue = styled.p`
  font-weight: 600;
  margin: 4px 0 0 0;
`

function WeatherDisplay({ city, setError }) {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return

      setIsLoading(true)
      setWeather(null)

      try {
        // Utilizziamo la tua API key tramite variabile d'ambiente
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch weather data")
        }

        const data = await response.json()
        setWeather(data)
        setError("")
      } catch (error) {
        console.error("Error fetching weather:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch weather data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [city, setError])

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <WeatherInfo>
      <WeatherHeader>
        <CityName>
          {weather.name}, {weather.sys.country}
        </CityName>
        <WeatherIcon>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </WeatherIcon>
        <Temperature>{Math.round(weather.main.temp)}°C</Temperature>
        <Description>{weather.weather[0].description}</Description>
      </WeatherHeader>

      <WeatherDetails>
        <DetailCard>
          <DetailIcon>💧</DetailIcon>
          <DetailContent>
            <DetailLabel>Humidity</DetailLabel>
            <DetailValue>{weather.main.humidity}%</DetailValue>
          </DetailContent>
        </DetailCard>

        <DetailCard>
          <DetailIcon>💨</DetailIcon>
          <DetailContent>
            <DetailLabel>Wind Speed</DetailLabel>
            <DetailValue>{weather.wind.speed} m/s</DetailValue>
          </DetailContent>
        </DetailCard>
      </WeatherDetails>
    </WeatherInfo>
  )
}

export default WeatherDisplay

