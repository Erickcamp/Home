import React, { useState } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { makeStyles, Button, TextField, Card, CardContent } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    margin: "0px",
  },

  root: {
    width: "60vw",
    margin: "40px 0px",
    padding: "40px 20px",
    backgroundColor: "#eef1f5",
    overflowWrap: "break-word",
  },

  btns: {
    flexDirection: "row",
  },

  input: {
    width: "100%",
  },
}))

const Post = (props) => {
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [content, setContent] = useState("")
  const classes = useStyles()

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleImg(e) {
    setImg(e.target.value)
  }

  function handleContent(e) {
    setContent(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post("/api/posts", { title, img, content, author_id: props.userReducer.user.userId })
      .then((res) => {
        props.history.push("/dashboard")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function cancel() {
    props.history.push("/dashboard")
  }

  return (
    <div className={classes.backgroundImg}>
      <div className={classes.btns}>
        <Card className={classes.root}>
          <CardContent>
            <TextField
              value={title}
              onChange={handleTitle}
              placeholder='Post Title...'
              className={classes.input}
              id='outlined-basic'
              label='Post Title...'
              variant='outlined'
              multiline
              rows={2}
            />
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <TextField
              value={img}
              onChange={handleImg}
              placeholder='Image URL...'
              className={classes.input}
              id='outlined-basic'
              label='Img...'
              variant='outlined'
              multiline
              rows={2}
            />
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <TextField
              value={content}
              onChange={handleContent}
              placeholder='Post Content...'
              className={classes.input}
              id='outlined-basic'
              label='Post Content...'
              variant='outlined'
              multiline
              rows={4}
            />
          </CardContent>
        </Card>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={cancel}>Cancel</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps)(Post)
