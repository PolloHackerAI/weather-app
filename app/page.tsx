"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import WeatherDisplay from "@/components/weather-display"

export default function WeatherApp() {
  const [city, setCity] = useState("Rome")
  const [searchCity, setSearchCity] = useState("Rome")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchCity(city)
    setError("")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Weather App</CardTitle>
          <CardDescription>Enter a city name to get the current weather</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          {error ? (
            <div className="text-center p-4 text-red-500">{error}</div>
          ) : (
            <WeatherDisplay city={searchCity} setError={setError} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

