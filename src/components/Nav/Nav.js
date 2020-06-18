import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  useEffect(() => {
    props.getUser();
  }, []);

  const { push } = props.history;
  if (props.history === "/") {
    return null;
  }
  return (
    <nav>
      <button onClick={() => push("/dashboard")}>Home</button>
      <button onClick={() => push("/post")}>New Post</button>
      <button onClick={() => push("/chat")}>Chat</button>
      <button onClick={() => push("/")}>Logout</button>
    </nav>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(withRouter(Nav));
