import {
  GET_RESTAURANTS,
  GET_RESTAURANT,
  ADD_RESTAURANT,
  UPDATE_RESTAURANT,
  DELETE_RESTAURANT,
  SET_CURRENT,
  CLEAR_CURRENT,
  RESET_TO_DEFAULT,
  SUBMIT_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW
} from './types'

export default (state, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload.results,
        loading: false
      }
    case GET_RESTAURANT:
      return {
        ...state,
        current: action.payload,
        loading: false
      }
    case ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload]
      }
    case UPDATE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.map(restaurant => {
          return restaurant.id === action.payload.id ? action.payload : restaurant
        }),
        loading: false
      }
    case DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter(restaurant => restaurant.id !== action.payload),
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
    case SUBMIT_REVIEW:
      return {
        ...state
        // TODO: or just fetch again
      }
    case UPDATE_REVIEW:
      return {
        ...state
        // TODO: or just fetch again
      }
    case DELETE_REVIEW:
      return {
        ...state
        // TODO: or just fetch again
      }

    default:
      console.error('Probably an issue - restaurantReducer.js')
      return state
  }
}
