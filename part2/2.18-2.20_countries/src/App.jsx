import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Content = ({filteredCountries}) => {
  console.log(filteredCountries.length)

  if (filteredCountries.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  } if (filteredCountries.length === 1){ 
    return(
      <div>
        {filteredCountries.map(country => 
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
          </div>
          )}
      </div>
    )
  }
      return(
        <div>
          {filteredCountries.map(country => 
            <p key={country.name.common}>
              {country.name.common}
            </p>)}
        </div>
      )
}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = allCountries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
    
  return (
   <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Content filteredCountries={filteredCountries}/>
      
   </div> 
  )
}

export default App