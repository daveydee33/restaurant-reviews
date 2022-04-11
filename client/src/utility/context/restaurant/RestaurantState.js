import { createContext, useReducer } from 'react'
import restaurantReducer from './restaurantReducer'
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
  UPDATE_REVIEW
} from './types'
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
      dispatch({ type: GET_RESTAURANTS, payload: res.data })
    } catch (err) {
      console.error('Get Restaurants error')
    }
  }

  // Get Restaurant
  const getRestaurant = async id => {
    try {
      const res = await axios.get(`/v1/restaurants/${id}`, { params: { limit: 1000 } })
      dispatch({ type: GET_RESTAURANT, payload: res.data })
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
      dispatch({ type: ADD_RESTAURANT, payload: res.data })
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
      dispatch({ type: UPDATE_RESTAURANT, payload: res.data })
    } catch (err) {
      console.error('Update Restaurant error', err)
    }
  }

  // Delete Restaurant
  const deleteRestaurant = async id => {
    try {
      const res = await axios.delete(`/v1/restaurants/${id}`)
      console.log(`Deleting restaurant: ${id}`, res.data)
      await dispatch({ type: DELETE_RESTAURANT, payload: id })
      getRestaurants()
    } catch (err) {
      console.error('Delete Restaurant error')
      console.error(err)
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

  // Submit Review
  const submitReview = async (id, payload) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(`/v1/restaurants/${id}/reviews`, payload, config)
      dispatch({ type: SUBMIT_REVIEW, payload: res.data })
      getRestaurant(id)
    } catch (err) {
      console.error('Submit review error', err)
    }
  }

  // Update Review
  const updateReview = async (restaurantId, reviewId, payload) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/v1/restaurants/${restaurantId}/reviews/${reviewId}`, payload, config)
      await dispatch({ type: UPDATE_REVIEW, payload: res.data })
      getRestaurant(restaurantId)
    } catch (err) {
      console.error('Update review error', err)
    }
  }

  // Delete Review
  const deleteReview = async (restaurantId, reviewId) => {
    try {
      const res = await axios.delete(`/v1/restaurants/${restaurantId}/reviews/${reviewId}`)
      await dispatch({ type: DELETE_RESTAURANT, payload: res.data })
      getRestaurant(restaurantId)
    } catch (err) {
      console.error('Delete review error')
    }
  }

  return (
    <restaurantContext.Provider
      value={{
        restaurants: state.restaurants,
        loading: state.loading,
        current: state.current,
        getRestaurants,
        getRestaurant,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
        setCurrent,
        clearCurrent,
        resetToDefault,
        submitReview,
        updateReview,
        deleteReview
      }}
    >
      {props.children}
    </restaurantContext.Provider>
  )
}
