const initialPosts = {
  posts: [],
}

const SET_POSTS = "SET_POSTS"

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
})

const postReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload }
    default:
      return state
  }
}

export default postReducer
