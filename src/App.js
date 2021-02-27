import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  let sites = [
    {
      name: 'google',
      attributes: {
        url: 'https://www.google.com',
        isDown: false,
        downCount: 0,
        status: 0,
        total: 0
      }
    },
    {
      name: 'yahoo',
      attributes: {
        url: 'https://www.yahoo.com',
        isDown: false,
        downCount: 0,
        status: 0,
        total: 0
      }
    },
    {
      name: 'ultimate',
      attributes: {
        url: 'https://www.ultimatesoftware.com',
        isDown: false,
        downCount: 0,
        status: 0,
        total: 0
      }
    }
  ]

  let [monitoredSites, setMonitoredSites] = useState(sites)
  let [isMonitoring, setIsMonitoring]     = useState(false)

  const monitorUpTime = () => {
    monitoredSites.map((site) => {
      axios.get('https://sleepy-plateau-48238.herokuapp.com/' + site.attributes.url)
      .then(response => site.attributes.status = response.status)
      .then(site.attributes.total += 1)
      .then(setMonitoredSites([...monitoredSites, site]))
      .then(console.log(monitoredSites, "monitored sites object"))
    })
  }

  let interval

  const beginMonitoring = () => {
    setIsMonitoring(true)
    monitorUpTime()
    interval = setInterval(monitorUpTime, 12000)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    clearInterval(interval)
  }

  if (!isMonitoring) {
    return(
      <div>
        <p onClick={() => beginMonitoring()}>Click me!</p>
      </div>
    )
  } else {
    return (
      <div>
        Started monitoring...
        {
          monitoredSites.map((site) => (
            <li key={site.name}>{site.name} - {site.attributes.status}</li>
          ))
        }
        <p onClick={() => stopMonitoring()}>Stop monitoring</p>
      </div>
    )
  }
}

export default App