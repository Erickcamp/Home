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
  const [username, setUsername] = useState("");
  const [userTyping, setUserTyping] = useState(false);
  const socket = io("http://localhost:4000");

  useEffect(() => {
    socket.on("global response", (data) => {
      console.log('global response: ', data)
      setMessages(data)
    });
    socket.on("room response", (data) => {
      //3
      setMessages(data)
    }); 
  }, [])
  // props.socket.on("typing", () => setTyping());
  // props.socket.on("stopped typing", () => stopTyping());

  useEffect(() => {
    // if (props.room !== "global") {
      socket.emit("join room", { room: "global", user: props.user.username });
    // }
  }, []);

  function handleMessage(e) {
    setMessage(e.target.value);
  }


  function broadcast() {
    //1
    socket.emit(
      'broadcast to room socket',
      {
        message: message,
        username: props.user.username,
        room: props.room,
      }
    );
  }

  function emit() {
    socket.emit(
      `broadcast to ${props.room !== "global" ? "room" : "global"} socket`,
      {
        message: message,
        username: props.user.username,
        room: props.room,
      }
    );
  }

  function blast() {
    socket.emit(
      `broadcast to ${props.room !== "global" ? "room" : "global"} socket`,
      {
        message: message,
        username: props.user.username,
        room: props.room,
      }
    );
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
          <>
            <TextField
              type="text"
              placeholder="Type Message Here"
              value={message}
              onChange={handleMessage}
            />
            <div className="buttons">
              <Button onClick={broadcast}>Broadcast</Button>
              <Button onClick={emit}>Emit</Button>
              <Button onClick={blast}>Blast</Button>
            </div>
          </>
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
