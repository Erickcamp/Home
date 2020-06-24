import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => {});

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

  function handlePosts(e) {
    setPosts(e.target.value);
  }

  function handleLoading(e) {
    setLoading(e.target.value);
  }

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
    <div>
      <div className="searchBox">
        <input
          placeholder="Search by Title"
          onChange={handleFilter}
          value={filter}
        />
        <button onClick={searchPosts}>Search</button>
        <button onClick={resetState}>Reset</button>
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
