import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => {});

const Post = (props) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

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
    <div>
      <h2>New Post</h2>
      <label>Post Title:</label>
      <input placeholder="title" value={title} onChange={handleTitle} />
      <label>Image URL</label>
      <input value={img} onChange={handleImg} />
      <label>Post Content:</label>
      <input
        placeholder="start typing here"
        value={content}
        onChange={handleContent}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Post);
