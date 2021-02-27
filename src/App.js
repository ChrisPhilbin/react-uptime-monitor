import React, { useState } from 'react'

const App = () => {

  let sites = [
    {
      name: 'google',
      attributes: {
        url: 'https://www.google.com',
        isDown: false,
        downCount: 0,
        httpStatusCode: 0,
        total: 0
      }
    },
    {
      name: 'yahoo',
      attributes: {
        url: 'https://www.yahoo.com',
        isDown: false,
        downCount: 0,
        httpStatusCode: 0,
        total: 0
      }
    },
    {
      name: 'ultimate',
      attributes: {
        url: 'https://www.ultimatesoftware.com',
        isDown: false,
        downCount: 0,
        httpStatusCode: 0,
        total: 0
      }
    }
  ]

  let [monitoredSites, setMonitoredSites] = useState(sites)
  let [isMonitoring, setIsMonitoring]     = useState(false)

  const monitorUpTime = () => {
    monitoredSites.forEach((site) => {
      fetch('https://sleepy-plateau-48238.herokuapp.com/' + site.attributes.url)
      .then(response => site.attributes.httpStatusCode = response.status)
      .then(site.attributes.total += 1)
      .then(setMonitoredSites([...monitoredSites]))
    })
  }

  const beginMonitoring = () => {
    setIsMonitoring(true)
    setInterval(monitorUpTime, 12000)
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
            <li key={site.name}>{site.name} - {site.attributes.httpStatusCode} - {site.attributes.total}</li>
          ))
        }
      </div>
    )
  }
}

export default App