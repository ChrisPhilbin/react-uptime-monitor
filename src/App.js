import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  let [googleStatus, setGoogleStatus] = useState('')

  const checkUpTime = (url) => {
    axios.get('https://sleepy-plateau-48238.herokuapp.com/' + url)
    .then(response => console.log(response.status, "response back"))
  }

  return(
    <div>
      Hello from React
      <p onClick={() => checkUpTime('https://www.google.com')}>Click me!</p>
    </div>
  )
}

export default App