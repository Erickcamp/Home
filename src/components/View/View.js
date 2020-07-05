import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "react-redux";
import {connect} from 'react-redux'
import {
  makeStyles,
  Card,
  CardContent,
  Button,
  CircularProgress,
  TextField,
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
    width: "60vw",
    margin: "40px 0px",
    padding: "40px 20px",
    backgroundColor: "#eef1f5",
    overflowWrap: "break-word",
    "& img": {
      width: "100%",
      objectFit: "cover",
    },
  },

  btns: {
    flexDirection: "row",
  },

  input: {
    width: "100%",
  },
}));

const View = (props) => {
  // const [myPostData, setMyPostData] = useState({title: '', img: '', content: '', author_id: ''})
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const {
    user: { userId },
  } = useStore().getState();
  const classes = useStyles();

  //axios call to update new post
  //axios.post('/api/updatepost', myPostData)

  useEffect(() => {
    function selectedPost() {
      axios
        .get(`/api/posts/${props.match.params.id}`)
        .then((res) => {
          setPost(res.data);
          setImg(res.data.img);
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    selectedPost();
  }, [props.match.params.id]);

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

  function submitHandler() {
    axios
      .put(`/api/posts/${props.match.params.id}`, {
        title,
        img,
        content,
        author_id: userId,
      })
      .then((res) => {
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editPost() {
    setEditMode(true);
  }

  function backBtn() {
    props.history.push("/dashboard");
  }

  function cancel() {
    props.history.push("/dashboard");
  }

  function titleHandler(e) {
    setTitle(e.target.value);
  }

  function imgHandler(e) {
    setImg(e.target.value);
  }

  function contentHandler(e) {
    setContent(e.target.value);
  }

  if (loading) return <CircularProgress />;

  return (
    <div className={classes.backgroundImg}>
      {editMode ? (
        <div>
          <Card className={classes.root}>
            <CardContent>
              <TextField
                value={title}
                onChange={titleHandler}
                placeholder="Title"
                className={classes.input}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                multiline
                rows={2}
              />
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <TextField
               value={img}
               onChange={imgHandler}
               placeholder="Image"
               className={classes.input}
               id="outlined-basic"
               label="Img"
               variant="outlined"
               multiline
               rows={2}
              />
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <TextField
                 value={content}
                 onChange={contentHandler}
                 placeholder="Content"
                 className={classes.input}
                 id="outlined-basic"
                 label="Content"
                 variant="outlined"
                 multiline
                 rows={4}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <Card>
            <CardContent>
              <h2>
                {post.title}
              </h2>
              <h5>by: {post.username}</h5>
              <p>{post.content}</p>
              <img src={post.img} alt="post img" />
            </CardContent>
          </Card>
        </div>
      )}
      {editMode ? (
        <div className={classes.btns}>
          <Button onClick={submitHandler}>Submit</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      ) : (
        <div className={classes.btns}>
          <Button onClick={backBtn}>Back</Button>
          <Button onClick={editPost}>Edit</Button>
          <Button onClick={deletePost}>Delete</Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(View);
