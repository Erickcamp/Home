import React, { useState } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { loginUser } from "../../ducks/userReducer"
import { makeStyles, TextField, Button } from "@material-ui/core"
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
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
    margin: "0 auto",
  },

  container: {
    width: "60vw",
    border: "solid",
    marginLeft: "20vw",
    borderWidth: "2px",
    borderColor: "ghostwhite",
    marginTop: "10px",
    fontSize: "large",
  },
}))

const Register = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [first_name, setFirst] = useState("")
  const [last_name, setLast] = useState("")
  const classes = useStyles()

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleConfirm(e) {
    setConfirmPassword(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handleFirstName(e) {
    setFirst(e.target.value)
  }

  function handleLastName(e) {
    setLast(e.target.value)
  }

  function register(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Password does not match")
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
          props.loginUser(res.data)
          props.history.push("/dashboard")
        })
        .catch((err) => {
          toast.error("Username is already in use.")
          console.log(err)
        })
    }
  }

  function cancel() {
    props.history.push("/")
  }

  return (
    <div className={classes.backgroundImg}>
      <div className={classes.container}>
        <p>
          Welcome Home! This is a social media site dedicated to all of those fighting cancer.
          Whether you just got diagnosed, you are currently fighting it, or have won the battle,
          this is a home to come to and a family to have. The goal is if you are newly diagnosed,
          you have answers and support. If you are alone, you have a family and a place to call
          home. Cancer is a unfortunate part of our reality, but that dosent mean we need to fight
          it alone. When you get too tired, rest and let us fight for you.
        </p>
      </div>
      <div className={classes.registerInfo}>
        <TextField placeholder='username' value={username} onChange={handleUsername} />
        <TextField
          placeholder='password'
          type='password'
          value={password}
          onChange={handlePassword}
        />
        <TextField
          placeholder='confirm password'
          type='password'
          value={confirmPassword}
          onChange={handleConfirm}
        />
        <TextField placeholder='email' value={email} onChange={handleEmail} />
        <TextField placeholder='first name' value={first_name} onChange={handleFirstName} />
        <TextField placeholder='last name' value={last_name} onChange={handleLastName} />
      </div>
      <Button onClick={register} className='reg-btn'>
        Register
      </Button>
      <Button onClick={cancel} className='reg-btn'>
        Cancel
      </Button>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { loginUser })(Register)
