import React, {useEffect } from "react";
import { connect, useStore, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "../../ducks/reducer";
import {GET_USER, LOGIN_USER, LOGOUT_USER} from '../../ducks/reducer'
import GetUsers from '../../hooks/GetUsers'

const Nav = (props) => {
  const { push } = props.history;
  if (props.location.pathname === "/") {
    return null;
  }
  if (props.location.pathname === '/register'){
    return null
  }
  // const state = GetUsers()
  // // const store = useStore()
  // // const storeState = store.getState()
  // // const dispatch = useDispatch()


  // // dispatch({type: GET_USER, payload: 'stuffffff'})

  // //form libraries : react-final-form
  // //               : formik

  // console.log('loading:', state.isLoading, 'data', state.users)

  // if(state.isLoading)return "Darth Plagueis was a Dark Lord of the Sith so powerful and so wise, he could use the Force to influence the midi-chlorians to create life. He had such a knowledge of the dark side, he could even keep the ones he cared about from dying."
  // else return state.users.map(user => <div style={{color: 'black', background: 'red', display: 'block', padding: '2rem' }}>{user}</div>)

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
