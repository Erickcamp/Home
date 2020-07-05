const initialFilter = {
  filter: "",
}

const SET_FILTER = "SET_FILTER"
const RESET_FILTER = "RESET_FILTER"

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
})

export const resetFilter = () => ({
  type: RESET_FILTER,
})

const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { filter: action.payload }
    case RESET_FILTER:
      return { filter: "" }
    default:
      return state
  }
}

export default filterReducer
