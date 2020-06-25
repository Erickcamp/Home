import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles, useTheme, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    height: "100vh",
    width: "100vw",
    position: "absolute",
  },
}));

const Post = (props) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const classes = useStyles()

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleImg(e) {
    setImg(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault()
      axios
      .post('/api/posts', {title, img, content, author_id:props.user.userId})
      .then((res) => {
          props.history.push('/dashboard')
      })
      .catch((err) => {
          console.log(err)
      })
  }

  function cancel() {
    props.history.push("/dashboard");
  }

  return (
    <div className={classes.backgroundImg}>
      <h2>New Post</h2>
      <label>Post Title:</label>
      <TextField value={title} onChange={handleTitle} />
      <label>Image URL:</label>
      <TextField value={img} onChange={handleImg} />
      <label>Post Content:</label>
      <TextField
        value={content}
        onChange={handleContent}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={cancel}>Cancel</Button>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Post);
