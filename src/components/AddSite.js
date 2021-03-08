import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }))

const AddSite = (props) => {

    const classes = useStyles()

    let [name, setName]       = useState('')
    let [url, setURL]         = useState('')
    let pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)

    const handleSubmit = () => {
        if (pattern.test(url)) {
            let newSite = {
                name: name,
                attributes: {
                    url: url,
                    isDown: false,
                    downCount: 0,
                    httpStatusCode: 0,
                    total: 0
                }
            }
            if (props.monitoredSites.includes(newSite.name)) {
                props.monitoredSites.push(newSite)
                props.setMonitoredSites([...props.monitoredSites])
                setName('')
                setURL('')
            } else {
                alert(`It looks like you already have ${newSite.name} listed!`)
            }
        } else {
            alert("URL must start with either http:// https:// or ftp://")
        }
    }
    return(
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" variant="outlined" label="Site name" placeholder="Google, Facebook, Twitter, etc." value={name} onChange={ (e) => setName(e.target.value)} />

                <TextField id="outlined-basic" variant="outlined" label="Site address" placeholder="https://www.google.com" value={url} onChange={ (e) => setURL(e.target.value)} />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add site
                </Button>
            </form>
        </div>
    )
}

export default AddSite