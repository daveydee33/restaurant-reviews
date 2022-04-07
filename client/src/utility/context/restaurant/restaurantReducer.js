import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  RESET_TO_DEFAULT,
  SUBMIT_REVIEW
} from './types'

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        restaurants: action.payload.results,
        loading: false
      }
    case GET_ITEM:
      return {
        ...state,
        current: action.payload,
        loading: false
      }
    case ADD_ITEM:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload]
      }
    case UPDATE_ITEM:
      return {
        ...state,
        restaurants: state.restaurants.map(restaurant => {
          return restaurant.id === action.payload.id ? action.payload : restaurant
        }),
        loading: false
      }
    case DELETE_ITEM:
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
        // TODO: add review? or just fetch again?
      }

    default:
      console.error('Probably an issue - restaurantReducer.js')
      return state
  }
}
