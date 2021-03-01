import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  headerGrid: {
    textAlign: 'center',
  }
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
        url: 'http://www.reddit.com',
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
    setIsMonitoring(true)
    monitoredSites.forEach((site) => {
      if (site.attributes.isDown === true) {
        return
      }
      console.log(site, "current site object being checked")
      fetch('https://sleepy-plateau-48238.herokuapp.com/' + site.attributes.url)
      .then(response => {
        if (response.status === 200) {
          site.attributes.httpStatusCode = response.status
          site.attributes.total += 1
          setMonitoredSites([...monitoredSites])
        } else {
          site.attributes.httpStatusCode = response.status
          site.attributes.downCount += 1
            if (site.attributes.downCount >= 4) {
              site.attributes.isDown = true
            }
          setMonitoredSites([...monitoredSites])
        }
      })
    })
  }

  let interval

  const beginMonitoring = () => {
    checkUpTime()
    interval = setInterval(checkUpTime, 5000)
  }

  const stopMonitoring = () => {
    clearInterval(beginMonitoring)
    setIsMonitoring(false)
  }

  const resetIsDown = (site) => {
    site.attributes.isDown = false
    site.attributes.downCount = 0
    setMonitoredSites([...monitoredSites])
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.headerGrid}>
          <Typography variant="h2" gutterBottom>Pay Watch 90210</Typography>
          { isMonitoring ? 
            <Button variant="contained" color="primary" onClick={ () => stopMonitoring() }>Stop Monitoring</Button> :
            <Button variant="contained" color="primary" onClick={ () => beginMonitoring() }>Start Monitoring</Button>
          }
        </Grid>
        {
          monitoredSites.map((site) => (
            <Grid item xs={6} key={site.name}>
              <Paper className={classes.paper}>
                <Typography variant="h3" align="center" color="primary">
                  {site.name}
                </Typography>
                {site.attributes.httpStatusCode} - {site.attributes.total} - {site.attributes.downCount}
                {site.attributes.isDown ? <Button variant="contained" color="primary" onClick={ () => resetIsDown(site)}>Start monitoring</Button> : null }
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default App