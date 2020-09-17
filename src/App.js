import React from 'react'
import Calendar from './calendar'
import './common/reset.css'

function App() {
  const onChange = (date) => {
    console.log(date)
  }
  return (
    <div className="App">
      <Calendar
        height="30px"
        width="230px"
        week={false}
        icon={false}
        onChange={onChange}
      />
    </div>
  )
}

export default App
