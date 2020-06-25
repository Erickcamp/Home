import React, { useState, useEffect } from "react";
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

const Dashboard = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [userposts, setUserposts] = useState(true);
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

  const checkboxHandler = () => {
    if (userposts) {
      setUserposts(false);
    } else {
      setUserposts(true);
    }
  };

  return (
    <div className={classes.backgroundImg}>
      <div className="searchBox">
        <TextField
          placeholder="Search by Title"
          onChange={handleFilter}
          value={filter}
        />
        <Button onClick={searchPosts}>Search</Button>
        <Button onClick={resetState}>Reset</Button>
        <span>My Posts</span>
        <input type="checkbox" onChange={checkboxHandler} checked={userposts} />
      </div>
      <div className="posts">
        {!loading ? (
          posts.map((el) => {
            return (
              <div
                key={el.id}
                onClick={() => props.history.push(`/posts/${el.id}`)}
              >
                <div className="content_posts dashboard_post_box">
                  <h3>{el.title}</h3>
                  <div className="username_box">
                    <p>Posted by: {el.username}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="load_box">
            <div className="load_background"></div>
            <div className="load"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Dashboard);
