import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import Register from "./components/Register/Register";
import View from "./components/View/View";
import { useStore } from "react-redux";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/chat" component={Chat} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/post" component={Post} />
      <ProtectedRoute path="/posts/:id" component={View} />
    </Switch>
  );
};

const ProtectedRoute = (props) => {
  const {
    user: { username },
  } = useStore().getState();

  if (username === "") {
    return <Redirect to="/" />;
  } else {
    return <Route {...props} />;
  }
};

export default Routes;
