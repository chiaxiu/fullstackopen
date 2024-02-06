import { useEffect, useState } from 'react'
import axios from 'axios'

// const Filter = ({filter, handleFilterChange}) => {
//   return(
//     <div>
//       filter shown with <input value={filter} onChange={handleFilterChange} />
//     </div>
//   )
// }

function App() {
  const [countries, setCountries] = useState([])
  // const [filter, setFilter] = useState('')

  // useEffect(() => {
  //   axios
  //     .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filter}`)
  //     .then(response => {
  //       setCountries(response.data)
  //     })
  // },[filter])

  // const handleFilterChange = (event) => {
  //   setFilter(event.target.value)
  // }
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        response.map(response => axios.post(`http://localhost:3001/countries`, response.data))
      })
  },[])
    

  return (
   <div>
      
      <div>
        {countries}
      </div>
   </div> 
  )
}

export default App