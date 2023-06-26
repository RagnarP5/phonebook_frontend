import { useState } from 'react'

const Header = ({ title })  => {
  return (
        <h1>{title}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ feedback, feedbackCounter }) => {
  if (feedback === 'positive') {
    return (
        <tr><td>{feedback}</td><td>{feedbackCounter}%</td></tr>
  )
  }

  return (
      <tr><td>{feedback}</td><td>{feedbackCounter}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good * 100 / total
  if (total === 0){
    return (
        <div>
          No feedback given
        </div>
    )
  }
  return (
      <div>
      <table>
        <tbody>
          <Statistic feedback='good' feedbackCounter={good}/>
          <Statistic feedback='neutral' feedbackCounter={neutral}/>
          <Statistic feedback='bad' feedbackCounter={bad}/>
          <Statistic feedback='average' feedbackCounter={average}/>
          <Statistic feedback='positive' feedbackCounter={positive}/>
        </tbody>
      </table>
      </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }



  return (
      <div>
        <Header title='give feedback' />
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <Header title='statistics' />
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

export default App