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
}));

const Chat = (props) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [userTyping, setUserTyping] = useState(false);
  const socket = io('http://localhost:4000');

 
  socket.on("global response", (data) => updateMessages(data));
  socket.on("room response", (data) => updateMessages(data));
  // props.socket.on("typing", () => setTyping());
  // props.socket.on("stopped typing", () => stopTyping());

  useEffect(() => {
    if (props.room !== "gloabl") {
      socket.emit("join room", { room: props.room });
    }
  }, []);

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function updateMessages(data) {
    setMessages([
      ...messages,
      { message: data.message, username: data.username },
    ]);
  }

  function broadcast() {
    socket.emit(
      `broadcast to ${props.room !== "global" ? "room" : "global"} socket`,
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
      <div>
        {messages.map((message, i) => {
          return (
            <div key={i}>
              <h5>{message.username}</h5>
              <p>{message.message}</p>
            </div>
          );
        })}
        <div className={"inputs"}>
          <>
            <h2 className="welcome-message">Welcome, {props.user.username}</h2>
            <input
              type="text"
              placeholder="Type Message Here"
              value={message}
              onChange={handleMessage}
            />
            <div className="buttons">
              <button onClick={broadcast}>Broadcast</button>
              <button onClick={emit}>Emit</button>
              <button onClick={blast}>Blast</button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  room: PropTypes.string
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Chat);
