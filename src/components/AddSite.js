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

    console.log(props, "props from AddSite component")

    const classes = useStyles()

    let [name, setName] = useState('')
    let [url, setURL]   = useState('')

    const handleSubmit = () => {
        console.log("handling submit...")
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