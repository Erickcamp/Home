import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../ducks/reducer";
import { makeStyles, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    height: "100vh",
    width: "100vw",
    position: "absolute",
  },

  formContainer: {
    width: "50vw",
    height: "25vh",
    margin: "0 auto",
    borderRadius: "14px",
    marginTop: "25px",
    padding: "20px",
    color: "white",
    fontFamily: "Open Sans, sans-serif",
    boxShadow: "5px 10px 35px  black",
  },

  loginInfo: {
    width: "100px",
    height: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    color: "white",
    margin: "0 auto",
  },

  loginBtn: {
    height: "20px",
    width: "100px",
    color: "black",
    margin: "20px",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  quote: {
    marginTop: "150px",
    fontSize: "40px",
  },
}));

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function login(e) {
    e.preventDefault();
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Incorrect username or password");
        console.log(err);
      });
  }

  function register() {
    props.history.push("/register");
  }

  return (
    <div className={classes.backgroundImg}>
      <form onSubmit={(e) => login(e)} className={classes.formContainer}>
        <h1>Welcome Home</h1>
        <div className={classes.loginInfo}>
          <TextField
            placeholder="username"
            value={username}
            onChange={handleUsername}
          />
          <TextField
            placeholder="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <Button type="submit" onClick={login} className={classes.loginBtn}>
          Login
        </Button>
        <Button onClick={register} className={classes.loginBtn}>
          Register
        </Button>
        <p className={classes.quote}>
          "You beat cancer by how you live, why you live, and the manner in
          which you live.” - Stuart Scott
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { loginUser })(Login);
