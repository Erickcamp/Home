import React, { useState, useEffect } from "react";
import { makeStyles, Button, TextField } from "@material-ui/core";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    height: "100vh",
    width: "100vw",
  },

  h2: {
    margin: "0px",
  },

  room: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "800px",
    width: "350px",
    // border: $lightGray solid
  },

  messages: {
    height: "80%",
    width: "90%",
    margin: "1rem",
    background: "lightgray",
    position: "relative",
  },

  message: {
    display: "flex",
    justifyContent: "space-between",
    margin: ".5rem",
    marginRight: "3rem",
  },

  input: {
    display: "block",
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [joined, setJoined] = useState(false);
  const socket = io(process.env.REACT_APP_SERVER_PORT)

  socket.on("global response", (data) => {
    console.log("global response: ", data);
    setMessages(data);
  });

  socket.on("room response", (data) => {
    //3
    setMessages(data);
  });

  useEffect(() => {
    if (!joined) {
      socket.emit("join room", { room: "global", user: props.user.username });
      setJoined(true);
    }
  }, [socket, props.user.username, joined]);

  // useEffect(()=>{
  //   const closeTheThing = () => socket.close()
  //   return ()=>{
  //     console.log('closing chat')
  //     closeTheThing()
  //   }
  // }, [])

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function leave() {
    props.history.push("/dashboard");
  }

  function broadcast() {
    //1
    socket.emit("broadcast to room socket", {
      message: message,
      username: props.user.username,
      room: props.room,
    });
    setMessage("");
  }

  return (
    <div className={classes.backgroundImg}>
      <div className={classes.room}>
        <h2 className={classes.h2}>Welcome, {props.user.username}</h2>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <h5>{message.username}</h5>
              <p>{message.message}</p>
            </div>
          );
        })}
        <div className={"inputs"}>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              type="text"
              placeholder="Type Message Here"
              value={message}
              onChange={handleMessage}
            />
            <div className="buttons">
              <Button type="submit" onClick={broadcast}>
                Send
              </Button>
              <Button onClick={leave}>Leave</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  room: PropTypes.string,
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Chat);
