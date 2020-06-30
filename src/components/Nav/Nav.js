import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: "linear-gradient(to top, #fed6e3 100%, #a8edea 100%)",
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: "black",
    height: "5vh",
  },

  btns: {
    display: "flex",
    justifyContent: "left",
    flexDirection: "row",
  },

  logout: {
    position: "absolute",
    top: "10px",
    right: "130px",
  },
}));

const Nav = (props) => {
  const classes = useStyles();

  const { push } = props.history;
  if (props.location.pathname === "/") {
    return null;
  }
  if (props.location.pathname === "/register") {
    return null;
  }

  console.log(props.user.username);
  if (props.user.username === "") push("/");

  return (
    <nav>
      <div className={classes.backgroundImg}>
        <div className={classes.btns}>
          <Button onClick={() => push("/dashboard")}>| Home |</Button>
          <Button onClick={() => push("/post")}>New Post |</Button>
          <Button onClick={() => push("/chat")}>Chat |</Button>
          <Button onClick={() => push("/")}>Logout |</Button>
        </div>
        <div className={classes.logout}>
          <label>Hey, {props.user.username}!</label>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(withRouter(Nav));
