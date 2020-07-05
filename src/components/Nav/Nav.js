import React from "react"
import { connect } from "react-redux"
import { useMediaQuery } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { Button, makeStyles, TextField } from "@material-ui/core"
import { resetFilter, setFilter, setPosts } from "../../ducks"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #fed6e3 100%, #a8edea 100%)",
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: "black",
    height: "5vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down(600)]: {
      // background: "yellow",
    },
  },

  btns: {
    display: "flex",
    justifyContent: "left",
  },
}))

const Nav = ({ history, location, userReducer, filterReducer, postReducer, ...props }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery("(max-width:600px)")

  const { push } = history
  if (location.pathname === "/") {
    return null
  }
  if (location.pathname === "/register") {
    return null
  }

  function handleFilter(e) {
    props.setFilter(e.target.value)
  }

  const searchPosts = () => {
    console.log("sending a filter of ", filterReducer.filter)
    axios
      .get(`/api/posts/?filter=${filterReducer.filter}`)
      .then((res) => {
        console.log("recieving results: ", res.data)
        props.setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const resetState = () => {
    props.resetFilter()
    axios
      .get("/api/posts")
      .then((res) => {
        props.setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  console.log("is this mobile?", isMobile)

  return (
    <nav>
      <div className={classes.backgroundImg}>
        <div className={classes.btns}>
          <Button onClick={() => push("/dashboard")}>Dashboard |</Button>
          <Button onClick={() => push("/post")}>New Post |</Button>
          <Button onClick={() => push("/chat")}>Chat |</Button>
          <Button onClick={() => push("/")}>Logout |</Button>
        </div>
        <div className={classes.searchBox}>
          <TextField
            placeholder='Search Posts Title...'
            onChange={handleFilter}
            value={filterReducer.filter}
          />
          <Button onClick={searchPosts}>Search</Button>
          <Button onClick={resetState}>Reset</Button>
        </div>
        <div>
          <label>Hey, {userReducer.user.username}!</label>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { setFilter, setPosts, resetFilter })(withRouter(Nav))
