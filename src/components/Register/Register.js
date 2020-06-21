import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../ducks/reducer";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirm(e) {
    setConfirmPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleFirstName(e) {
    setFirst(e.target.value);
  }

  function handleLastName(e) {
    setLast(e.target.value);
  }

  function register(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password does not match");
    } else {
      axios
        .post("/auth/register", {
          username,
          password,
          email,
          first_name,
          last_name,
        })
        .then((res) => {
          props.loginUser(res.data);
          props.history.push("/dashboard");
        })
        .catch((err) => {
          alert("username is already in use.");
          console.log(err);
        });
    }
  }

  function cancel() {
    props.history.push("/");
  }

  return (
    <div className="register-container">
      <div className="register-input">
        <input
          placeholder="username"
          value={username}
          onChange={handleUsername}
          className="register-username-input"
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePassword}
          className="register-password-input"
        />
        <input
          placeholder="confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirm}
          className="register-confirm-input"
        />
        <input
          placeholder="email"
          value={email}
          onChange={handleEmail}
          className="register-email-input"
        />
        <input
          placeholder="first name"
          value={first_name}
          onChange={handleFirstName}
          className="register-first-input"
        />
        <input
          placeholder="last name"
          value={last_name}
          onChange={handleLastName}
          className="register-last-input"
        />
      </div>
      <button onClick={register} className="reg-btn">
        Register
      </button>
      <button onClick={cancel} className="reg-btn">
        Cancel
      </button>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { loginUser })(Register);
