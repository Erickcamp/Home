const initialState = {
  user: { username: "", userId: 0 },
}

export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: initialState,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload }
    case LOGOUT_USER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case LOGIN_USER:
//       return { ...state, user: action.payload }
//     case LOGOUT_USER:
//       return { ...state, ...action.payload }
//     case UPDATE_FILTER:
//       return { ...state, filter: action.payload }
//     default:
//       return state
//   }
// }
