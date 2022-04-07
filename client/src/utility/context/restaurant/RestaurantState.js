import { createContext, useReducer } from 'react'
import restaurantReducer from './restaurantReducer'
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_CURRENT, CLEAR_CURRENT, RESET_TO_DEFAULT } from './types'
import axios from 'axios'

export const restaurantContext = createContext()

export const RestaurantState = props => {
  const initialState = {
    restaurants: [],
    current: null,
    loading: true
  }

  const [state, dispatch] = useReducer(restaurantReducer, initialState)

  // Get Restaurants
  const getRestaurants = async () => {
    try {
      const res = await axios.get('/v1/restaurants', { params: { limit: 1000 } })
      dispatch({ type: GET_ITEMS, payload: res.data })
    } catch (err) {
      console.error('Get Restaurants error')
    }
  }

  // Add Restaurant
  const addRestaurant = async restaurant => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/v1/restaurants', restaurant, config)
      dispatch({ type: ADD_ITEM, payload: res.data })
    } catch (err) {
      console.error('Add Restaurant error', err)
    }
  }

  // Update Restaurant
  const updateRestaurant = async (id, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/v1/restaurants/${id}`, data, config)
      dispatch({ type: UPDATE_ITEM, payload: res.data })
    } catch (err) {
      console.error('Update Restaurant error', err)
    }
  }

  // Delete Restaurant
  const deleteRestaurant = async id => {
    try {
      const res = await axios.delete(`/v1/restaurants/${id}`)
      console.log(`Deleting restaurant: ${id}`, res.data)
      dispatch({ type: DELETE_ITEM, payload: id })
    } catch (err) {
      console.error('Delete Restaurant error')
    }
  }

  // Set Current Restaurant
  const setCurrent = restaurant => {
    dispatch({ type: SET_CURRENT, payload: restaurant })
  }

  // Clear Current Restaurant
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Clear All / Reset to Defaults
  const resetToDefault = () => {
    dispatch({ type: RESET_TO_DEFAULT, payload: initialState })
  }

  return (
    <restaurantContext.Provider
      value={{
        restaurants: state.restaurants,
        loading: state.loading,
        current: state.current,
        getRestaurants,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
        setCurrent,
        clearCurrent,
        resetToDefault
      }}
    >
      {props.children}
    </restaurantContext.Provider>
  )
}
