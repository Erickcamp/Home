import React, {useState, useEffect} from 'react'
import {makeStyles, Button, TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    backgroundImg: {
      backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
      height: "100vh",
      width: "100vw",
    },
  }));

const Chat = () => {
    const classes = useStyles()

    return(
        <div className={classes.backgroundImg}>
            This is Chat
        </div>
    )
}

export default Chat