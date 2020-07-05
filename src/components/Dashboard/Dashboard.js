import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  makeStyles,
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import {Chat, Reply, Favorite} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    width: "100vw",
  },

  posts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  root: {
    width: "40vw",
    margin: "5px",
    backgroundColor: "#eef1f5",
    padding: '20px'
  },

  searchBox: {
    position: "absolute",
    right: "800px",
    top: "0px",
  },

  content: {
    overflowWrap: "break-word",
      '& img': {
        width:'100%',
        objectFit: 'cover'
      }
  },

  actions: {
    padding:'10px 20px',
    display: 'flex',
    alignItems: 'center'
  },

  actionBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  h5: {
    margin: '0px'
  }
}));

const Dashboard = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [increment, setIncrement] = useState(0)
  const classes = useStyles();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchPosts = () => {
    axios
      .get(`/api/posts/?filter=${filter}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetState = () => {
    axios
      .get("/api/posts")
      .then((res) => {
        setFilter("");
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  function incrementHandler() {
    setIncrement(increment + 1)
  }

  return (
    <div className={classes.backgroundImg}>
      <div className={classes.searchBox}>
        <TextField
          placeholder="Search Posts Title..."
          onChange={handleFilter}
          value={filter}
        />
        <Button onClick={searchPosts}>Search</Button>
        <Button onClick={resetState}>Reset</Button>
      </div>
      <div className={classes.posts}>
        {!loading ? (
          posts.map((el) => {
            return (
              <Card
                className={classes.root}
                variant="outlined"
                key={el.id}
                onClick={() => props.history.push(`/posts/${el.id}`)}
              >
                <div className={classes.content}>
                  <CardContent>
                    <h3>
                      {el.title}
                    </h3>
                    <h5 className={classes.h5}>posted by: {el.username}</h5>
                    <p>{el.content}</p>
                    <img src={el.img} alt='post img'/>
                    <hr />
                    <div className={classes.actionBox}>
                      <a href='#' className={classes.actions}><Favorite />Like</a>
                      <a href='#' className={classes.actions}><Chat />Comment</a>
                      <a href='#' className={classes.actions}><Reply />Share</a>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="load_box">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Dashboard);
