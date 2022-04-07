import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER, SET_CURRENT, CLEAR_CURRENT, RESET_TO_DEFAULT } from './types'

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.results,
        loading: false
      }
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : user)),
        loading: false
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        loading: false
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case RESET_TO_DEFAULT:
      return {
        ...action.payload
      }

    default:
      console.error('Probably an issue - userReducer.js')
      return state
  }
}
