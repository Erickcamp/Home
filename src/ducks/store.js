import userReducer from "./userReducer"
import postReducer from "./postReducer"
import filterReducer from "./filterReducer"
import { createStore, combineReducers } from "redux"

export default createStore(
  combineReducers({ userReducer, postReducer, filterReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
