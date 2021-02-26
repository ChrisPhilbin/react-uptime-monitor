import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  let [googleStatus, setGoogleStatus] = useState({status: 0, count: 0})

  const monitorkUpTime = (url, stats, setter) => {
    axios.get('https://sleepy-plateau-48238.herokuapp.com/' + url)
    .then(response => setter({...stats, status: response.status}))
  }

  console.log(googleStatus, "google status")

  return(
    <div>
      Hello from React
      <p onClick={() => monitorUpTime('https://www.google.com', googleStatus, setGoogleStatus)}>Click me!</p>
    </div>
  )
}

export default App