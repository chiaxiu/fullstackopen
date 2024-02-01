import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'percent') {
    return(
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )   
  }

  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ matrics }) => {
  const total = matrics.good + matrics.neutral + matrics.bad
  const average = (matrics.good * 1 + matrics.bad * -1) / total
  const percent = (matrics.good * 100) / total

  if ( total === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={matrics.good} />
          <StatisticLine text='neutral' value={matrics.neutral} />
          <StatisticLine text='bad' value={matrics.bad} />
          <StatisticLine text='total' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='percent' value={percent} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [matrics, setMatrics] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => {
    setMatrics({...matrics, good: matrics.good + 1})
  }

  const handleNeutralClick = () => {
    setMatrics({...matrics, neutral: matrics.neutral + 1})
  }

  const handleBadClick = () => {
    setMatrics({...matrics, bad: matrics.bad + 1})
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' handleClick={handleGoodClick}/>
      <Button name='neutral' handleClick={handleNeutralClick}/>
      <Button name='bad' handleClick={handleBadClick}/>
      <h1>statistics</h1>
      <Statistics matrics={matrics} />
    </div>
  )
}

export default App