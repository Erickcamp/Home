import React, { useState, useEffect } from "react"
import { makeStyles, Button, TextField } from "@material-ui/core"
import io from "socket.io-client"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    height: "95vh",
    width: "100vw",
    display: "flex",
  },

  room: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    margin: "0px",
    alignItems: "center",
    overflowY: "scroll",
    overscrollBehaviorY: "contain",
    scrollSnapType: "y",
    "& > div:last-child": {
      scrollSnapAlign: "end",
    },
  },

  messages: {
    wordBreak: "break-all",
    borderWidth: "3px",
    borderColor: "black",
    borderRight: "solid",
    borderLeft: "solid",
    borderTop: "solid",
    borderBottom: "solid",
    margin: "3px",
    width: "50vw",
  },

  input: {
    position: "absolute",
    bottom: "30px",
    right: "500px",
    width: "50%",
    border: "1px solid black",
  },

  btns: {
    position: "absolute",
    bottom: "30px",
    right: "360px",
  },
}))

const Chat = (props) => {
  const classes = useStyles()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [joined, setJoined] = useState(false)
  const socket = io(process.env.REACT_APP_SERVER_PORT)

  socket.on("global response", (data) => {
    console.log("global response: ", data)
    setMessages(data)
  })

  socket.on("room response", (data) => {
    //3
    setMessages(data)
  })

  useEffect(() => {
    if (!joined) {
      socket.emit("join room", { room: "global", user: props.userReducer.user.username })
      setJoined(true)
    }
  }, [socket, props.userReducer.user.username, joined])

  // useEffect(()=>{
  //   const closeTheThing = () => socket.close()
  //   return ()=>{
  //     console.log('closing chat')
  //     closeTheThing()
  //   }
  // }, [])

  function handleMessage(e) {
    setMessage(e.target.value)
  }

  function leave() {
    props.history.push("/dashboard")
  }

  function broadcast() {
    //1
    socket.emit("broadcast to room socket", {
      message: message,
      username: props.userReducer.user.username,
      room: props.room,
    })
    setMessage("")
  }

  return (
    <div className={classes.backgroundImg}>
      <div className={classes.room}>
        {messages.map((message, index) => {
          return (
            <div key={index} className={classes.messages}>
              <h5>{message.username}:</h5>
              <p>{message.message}</p>
            </div>
          )
        })}
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            type='text'
            placeholder='Type Message Here...'
            value={message}
            onChange={handleMessage}
            className={classes.input}
          />
          <div className={classes.btns}>
            <Button type='submit' onClick={broadcast}>
              Send
            </Button>
            <Button onClick={leave}>Leave</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

Chat.propTypes = {
  room: PropTypes.string,
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps)(Chat)
