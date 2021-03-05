import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

import AddSite from './components/AddSite'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative'
  },
  headerGrid: {
    textAlign: 'center',
  },
  deleteIcon: {
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 0
  },
  titleDanger: {
    color: '#FF0000'
  }
}));

let interval = null
let timer    = null

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
  let [timeToRefresh, setTimeToRefresh]   = useState(300)

   const checkUpTime = () => {
    setTimeToRefresh(300)
    monitoredSites.forEach((site) => {
      if (site.attributes.isDown === true) {
        return
      }
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
              sendSMS(site.name)
            }
          setMonitoredSites([...monitoredSites])
        }
      })
    })
  }

  const startTimer = () => {
    setTimeToRefresh(300)
    timer = setInterval(() => {
      setTimeToRefresh(prevTimeToRefresh => prevTimeToRefresh - 1)
    }, 1000) 
  }

  const startMonitoring = () => {
    setIsMonitoring(true)
    checkUpTime()
    startTimer()
    interval = setInterval(checkUpTime, 300000)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    clearInterval(interval)
    interval = 0
    clearInterval(timer)
    timer = 0
  }
  
  const resetIsDown = (site) => {
    site.attributes.isDown = false
    site.attributes.downCount = 0
    setMonitoredSites([...monitoredSites])
  }

  const removeSite = (name) => {
    monitoredSites = monitoredSites.filter((site) => site.name !== name)
    setMonitoredSites([...monitoredSites])
  }

  const sendSMS = (name) => {
    let message = {
      body: `It looks like ${name} is currently experiencing down time!`
    }

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log("Successfully sent SMS message!")
      } else {
        console.log("Something went wrong when sending an SMS!")
        alert(`It looks like ${name} is currently experiencing down time and was unable to send a text message!`)
      }
    })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.headerGrid}>
          <Typography variant="h2" gutterBottom>Pay Watch</Typography>
          { isMonitoring ?
          <div>
            <Button variant="contained" color="primary" onClick={stopMonitoring}>Stop Monitoring</Button><br />
            <span>Next refresh in: {timeToRefresh} seconds</span>
          </div>
          :
          <Button variant="contained" color="primary" onClick={startMonitoring}>Start Monitoring</Button>
          }
        </Grid>

        <Grid item xs={12} className={classes.headerGrid}>
          <AddSite monitoredSites={monitoredSites} setMonitoredSites={setMonitoredSites} />
        </Grid>
        {
          monitoredSites.map((site) => (
            <Grid item xs={6} key={site.name}>
              <Paper className={classes.paper}>
                <div>
                  <DeleteIcon className={classes.deleteIcon} onClick={() => removeSite(site.name)} />
                  <Typography className={site.attributes.isDown ? classes.titleDanger : ""} variant="h3" align="center" color="primary">
                    {site.name}
                  </Typography>
                  <div className={site.attributes.isDown ? classes.titleDanger : ""}>
                    status: {site.attributes.httpStatusCode}<br />
                    total times checked: {site.attributes.total}<br />
                    total times failed: {site.attributes.downCount}<br />
                    {site.attributes.isDown ? <Button variant="contained" color="primary" onClick={ () => resetIsDown(site)}>Start monitoring</Button> : null }
                  </div>
                </div>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default App