import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_CURRENT, CLEAR_CURRENT, RESET_TO_DEFAULT } from './types'

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        restaurants: action.payload.results,
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

    default:
      console.error('Probably an issue - restaurantReducer.js')
      return state
  }
}
