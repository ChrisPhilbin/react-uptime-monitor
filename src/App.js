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

  //component does not properly re-render because state is not being updated
  //using #setMonitoredSites - need to re-factor code in order to utilize setMonitoredSites

  const monitorUpTime = () => {
    sites.map((site) => {
      axios.get('https://sleepy-plateau-48238.herokuapp.com/' + site.url)
      .then(response => site.status = response.status)
      // .then(response => setMonitoredSites({...monitoredSites, }))
      .then(site.total += 1)
      .then(console.log(site, "site object"))
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
            <li key={site.name}>{site.name} - {site.status}</li>
          ))
        }
      </div>
    )
  }
}

export default App