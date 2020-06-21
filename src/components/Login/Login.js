import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../ducks/reducer";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        alert("Incorrect username or password");
        console.log(err);
      });
  }

  function register(e) {
    props.history.push("/register");
  }

  return (
    <div className="login-container">
      <form onSubmit={(e) => login(e)} className="form-container">
        <h1>Welcome Home</h1>
        <div className="input-info">
          <input
            placeholder="username"
            value={username}
            onChange={handleUsername}
            className="username-input"
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={handlePassword}
            className="password-input"
          />
        </div>
        <button onClick={login} className="login-btn">
          Login
        </button>
        <button onClick={register} className="login-btn">
          Register
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { loginUser })(Login);