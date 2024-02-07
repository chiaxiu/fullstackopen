import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Button = ({handleButtonClick, country}) => {
  return(
    <button onClick={() => handleButtonClick(country)}>Show</button>
  )
}

const Country = ({country}) => {
  const [temperature, setTemperature] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [icon, setIcon] = useState(null)
  const [iconUrl, setIconUrl] = useState('')
  const api_key = import.meta.env.VITE_SOME_KEY

  axios
    .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&exclude=minutely,hourly,daily&appid=${api_key}`)
    .then(response => {
      setTemperature(response.data.current.temp)
      setWindSpeed(response.data.current.wind_speed)
      setIcon(response.data.current.weather[0].icon)
      setIconUrl(`https://openweathermap.org/img/wn/${icon}@2x.png`)
    })

  return(
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>  
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temperature} Celcius</p>
      <img src={iconUrl} alt="image not available"/>
      <p>wind {windSpeed} m/s</p>
    </div>
  )
}

const Content = ({filteredCountries, handleButtonClick, selectedCountry}) => {
  console.log(filteredCountries.length)

  if (filteredCountries.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  } if (filteredCountries.length === 1){ 
      const country = filteredCountries[0]
      
      return(
        <Country country={country}/>            
      )
    } if (selectedCountry !== null) {
        const country = selectedCountry

        return(
          <Country country={country}/>              
        )
      }
        return(
          <div>
            {filteredCountries.map(country => 
              <div key={country.name.common}>
                <>{country.name.common} </>
                <Button handleButtonClick={handleButtonClick} country={country}/>
              </div>
            )}
          </div>
        )
}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null) // Clear selected country when filtering
  }

  const handleButtonClick = (country) => {
    setSelectedCountry(country)
  }

  const filteredCountries = allCountries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
    
  return (
   <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Content 
        filteredCountries={filteredCountries}
        handleButtonClick={handleButtonClick}
        selectedCountry={selectedCountry}
      />  
   </div> 
  )
}

export default App