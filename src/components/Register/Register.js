import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../ducks/reducer";
import { makeStyles, useTheme, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify"


const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    height: "100vh",
    width: "100vw",
    position: "absolute",
  },

  registerInfo: {
    width: "100vw",
    height: '60vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
    margin: "0 auto",
  },
}));

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const classes = useStyles();

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
      toast.error("Password does not match");
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
          toast.error("Username is already in use.");
          console.log(err);
        });
    }
  }

  function cancel() {
    props.history.push("/");
  }

  return (
    <div className={classes.backgroundImg}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus nibh,
        feugiat et nunc molestie, pretium bibendum ante. Pellentesque aliquet
        mauris sed purus consequat, a faucibus leo tempor. Phasellus eget
        pulvinar erat, in elementum lectus. Donec ut molestie elit, eget aliquam
        justo. Sed euismod feugiat arcu. Cras at lorem sed orci convallis
        congue. Nullam lacus sem, gravida et neque in, volutpat mattis risus.
        Nulla facilisi. Vestibulum nec rutrum ex. Fusce ullamcorper, felis at
        semper fermentum, neque neque facilisis nunc, vel maximus neque urna in
        est. Sed volutpat, augue in congue rhoncus, tortor justo efficitur orci,
        in fringilla est dui vel lacus. Mauris sed condimentum nibh. Etiam id
        pulvinar orci.
      </p>
      <div className={classes.registerInfo}>
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
        <TextField
          placeholder="confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirm}
        />
        <TextField
          placeholder="email"
          value={email}
          onChange={handleEmail}
        />
        <TextField
          placeholder="first name"
          value={first_name}
          onChange={handleFirstName}
        />
        <TextField
          placeholder="last name"
          value={last_name}
          onChange={handleLastName}
        />
      </div>
      <Button onClick={register} className="reg-btn">
        Register
      </Button>
      <Button onClick={cancel} className="reg-btn">
        Cancel
      </Button>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { loginUser })(Register);
