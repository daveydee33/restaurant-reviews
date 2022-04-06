import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_CURRENT, CLEAR_CURRENT, RESET_TO_DEFAULT } from './types'

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload.results,
        loading: false
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    case UPDATE_ITEM:
      return {
        ...state,
        // idea 1 - push the new item to the front of the array, and remove it's previous record out of it's place in the array
        // items: [
        //   action.payload,
        //   ...state.items.filter(item => item.id !== action.payload.id)
        // ],
        // idea 2 - this will replace the item in it's existing position in the array.  I think I like this method better, because I can always sort the array by dateModified later.
        items: state.items.map(item => (item.id === action.payload.id ? action.payload : item)),
        loading: false
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
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
      console.error('Probably an issue - itemReducer.js')
      return state
  }
}
