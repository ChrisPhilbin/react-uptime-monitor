import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {

  const classes = useStyles()

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
      name: 'reddit',
      attributes: {
        url: 'https://www.reddit.com',
        isDown: false,
        downCount: 0,
        httpStatusCode: 0,
        total: 0
      }
    },
    {
      name: 'facebook',
      attributes: {
        url: 'https://www.facebook.com',
        isDown: false,
        downCount: 0,
        httpStatusCode: 0,
        total: 0
      }
    }
  ]

  let [monitoredSites, setMonitoredSites] = useState(sites)
  let [isMonitoring, setIsMonitoring]     = useState(false)

   const checkUpTime = () => {
    monitoredSites.forEach((site) => {
      fetch('https://sleepy-plateau-48238.herokuapp.com/' + site.attributes.url)
      .then(response => {
        if (response.status === 200) {
          site.attributes.httpStatusCode = response.status
          setMonitoredSites([...monitoredSites])
        } else {
          site.attributes.httpStatusCode = response.status
          site.attributes.downCount += 1
            if (site.attributes.downCount >= 4) {
              alert(`It appears as though ${site.name} is currently down!`)
              site.attributes.isDown = true
            }
          setMonitoredSites([...monitoredSites])
        }
      })
    })
  }

  const beginMonitoring = () => {
    setIsMonitoring(true)
    checkUpTime()
    setInterval(checkUpTime, 15000)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <button onClick={() => beginMonitoring()}>Begin</button>
        </Grid>
        {
          monitoredSites.map((site) => (
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <li key={site.name}>{site.name} - {site.attributes.httpStatusCode} - {site.attributes.total} - {site.attributes.downCount}</li>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default App