import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, makeStyles, useTheme } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #fed6e3 100%, #a8edea 100%)",
  },
}));

const Nav = (props) => {
  const classes  = useStyles()

  const { push } = props.history;
  if (props.location.pathname === "/") {
    return null;
  }
  if (props.location.pathname === "/register") {
    return null;
  }

  return (
    <nav>
      <div className={classes.backgroundImg}>
        <Button onClick={() => push("/dashboard")}>Home</Button>
        <Button onClick={() => push("/post")}>New Post</Button>
        <Button onClick={() => push("/chat")}>Chat</Button>
        <Button onClick={() => push("/")}>Logout</Button>
        <div>
          Hey, {props.user.username}!
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(withRouter(Nav));
