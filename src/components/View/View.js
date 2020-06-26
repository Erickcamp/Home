import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  useTheme,
  Card,
  CardContent,
  Button,
  CircularProgress
} from "@material-ui/core";

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

  root: {
    width: "50vw",
    margin: "5px",
    backgroundColor: "#eef1f5",
    overflowWrap: 'break-word'
  },

  btns: {
    flexDirection: "row",
  },
}));

const View = (props) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [author_id, setAuthor] = useState("null");
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

  function deletePost() {
    axios
      .delete(`/api/posts/${props.match.params.id}`)
      .then((res) => {
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editPost() {
    props.history.push(`/api/posts/`)
  }

  function backBtn() {
    props.history.push("/dashboard");
  }

  return (
    <div className={classes.backgroundImg}>
      {!loading ? (
        <Card className={classes.root}>
          <CardContent>
            <h2 className="title">{post.title} by: {post.username}</h2>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ) : (
        <div>
           <CircularProgress />
        </div>
      )}
      <div className={classes.btns}>
        <Button onClick={backBtn}>Back</Button>
        <Button onClick={editPost}>Edit</Button>
        <Button onClick={deletePost}>Delete</Button>
      </div>
    </div>
  );
};

export default View;
