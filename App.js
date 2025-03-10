"use client"

import { useState } from "react"
import styled from "styled-components"
import WeatherDisplay from "./components/WeatherDisplay"

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
`

const WeatherCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  background-color:rgba(2, 231, 251, 0.21);
`

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 24px;
  text-align: center;
  background-color:rgba(2, 231, 251, 0.21);
`

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
`

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`

const SearchButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0060df;
  }
`


function App() {
  const [city, setCity] = useState("Roma")
  const [searchCity, setSearchCity] = useState("Roma")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchCity(city)
    setError("")
  }

  return (
    <Container>
      <WeatherCard>
        <Title>Meteo M</Title>
        <Subtitle>Inserisci il nome di una citta' </Subtitle>

        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Nome della città"
          />
          <SearchButton type="submit">Cerca</SearchButton>
        </SearchForm>

      </WeatherCard>
    </Container>
  )
}

export default App

