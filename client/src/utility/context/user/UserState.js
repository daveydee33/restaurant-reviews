import { createContext, useReducer } from 'react'
import userReducer from './userReducer'
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER, SET_CURRENT, CLEAR_CURRENT, RESET_TO_DEFAULT } from './types'
import axios from 'axios'

export const userContext = createContext()

export const UserState = props => {
  const initialState = {
    users: [],
    current: null,
    loading: true
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get('/v1/users', { params: { limit: 1000 } })
      dispatch({ type: GET_USERS, payload: res.data })
    } catch (err) {
      console.error('Get error')
    }
  }

  // Add User
  const addUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/v1/users', user, config)
      dispatch({ type: ADD_USER, payload: res.data })
    } catch (err) {
      console.error('Add error', err)
    }
  }

  // Update User
  const updateUser = async (id, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/v1/users/${id}`, data, config)
      dispatch({ type: UPDATE_USER, payload: res.data })
    } catch (err) {
      console.error('Update error', err)
    }
  }

  // Delete User
  const deleteUser = async id => {
    try {
      const res = await axios.delete(`/v1/users/${id}`)
      console.log(`Deleting user: ${id}`, res.data)
      dispatch({ type: DELETE_USER, payload: id })
    } catch (err) {
      console.error('Delete error')
    }
  }

  // Set Current User
  const setCurrent = user => {
    dispatch({ type: SET_CURRENT, payload: user })
  }

  // Clear Current User
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Clear All / Reset to Defaults
  const resetToDefault = () => {
    dispatch({ type: RESET_TO_DEFAULT, payload: initialState })
  }

  return (
    <userContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        current: state.current,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        resetToDefault
      }}
    >
      {props.children}
    </userContext.Provider>
  )
}
