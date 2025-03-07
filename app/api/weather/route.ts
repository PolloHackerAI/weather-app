import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ message: "City parameter is required" }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ message: "API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      { next: { revalidate: 1800 } }, // Cache for 30 minutes
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          message: errorData.message || "Failed to fetch weather data",
          code: errorData.cod,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ message: "Failed to fetch weather data" }, { status: 500 })
  }
}

