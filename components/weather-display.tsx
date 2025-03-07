"use client"

import { useEffect, useState } from "react"
import { Droplets, Loader2, Wind } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface WeatherData {
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
    humidity: number
  }
  wind: {
    speed: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
}

export default function WeatherDisplay({
  city,
  setError,
}: {
  city: string
  setError: (error: string) => void
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return

      setIsLoading(true)
      setWeather(null)

      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

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
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {weather.name}, {weather.sys.country}
        </h2>
        <div className="flex justify-center my-2">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width={80}
            height={80}
          />
        </div>
        <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
        <p className="text-muted-foreground capitalize">{weather.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{weather.main.humidity}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-medium">{weather.wind.speed} m/s</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

