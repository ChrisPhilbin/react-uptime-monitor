import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    monitoredSites.forEach((site) => {
      fetch('https://sleepy-plateau-48238.herokuapp.com/' + site.attributes.url)
      .then(response => site.attributes.httpStatusCode = response.status)
    })
  }, [monitoredSites])

  // const monitorUpTime = () => {
  //   monitoredSites.forEach((site) => {
  //     fetch('https://sleepy-plateau-48238.herokuapp.com/' + site.attributes.url)
  //     .then(response => site.attributes.httpStatusCode = response.status)
  //     .then(setMonitoredSites([...monitoredSites]))
  //   })
  // }

  // const clearDownCounts = () => {
  //   monitoredSites.forEach((site) => {
  //     site.attributes.downCount = 0
  //   })
  // }

  // const beginMonitoring = () => {
  //   setIsMonitoring(true)
  //   monitorUpTime()
  //   setInterval(monitorUpTime, 180000)
  //   setInterval(clearDownCounts, 900000) //automatically clear the downCounts after 15 minutes
  // }

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

export default App