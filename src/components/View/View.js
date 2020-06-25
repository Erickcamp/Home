import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    height: "100vh",
    width: "100vw",
    position: "absolute",
  },
}));

const View = (props) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const classes = useStyles();

  useEffect(() => {
    selectedPost();
  });

  function selectedPost() {
    axios
      .get(`/api/posts/${props.match.params.id}`)
      .then((res) => {
        setLoading(false);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={classes.backgroundImg}>
      {!loading ? (
        <div>
          <div className="post_header">
            <h2 className="title">{post.title}</h2>
            <div className="author_box">
              <p>by {post.username}</p>
            </div>
          </div>
          <div className="post_content_box">
            <p>{post.content}</p>
          </div>
        </div>
      ) : (
        <div className="load_box">
          <div className="load_background"></div>
          <div className="load"></div>
        </div>
      )}
    </div>
  );
};

export default View;
