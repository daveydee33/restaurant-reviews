import { createContext, useReducer } from 'react'
import itemReducer from './itemReducer'
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_CURRENT, CLEAR_CURRENT, RESET_TO_DEFAULT } from './types'
import axios from 'axios'

export const itemContext = createContext()

export const ItemState = props => {
  const initialState = {
    items: [],
    current: null,
    loading: true
  }

  const [state, dispatch] = useReducer(itemReducer, initialState)

  // Get Items
  const getItems = async () => {
    try {
      const res = await axios.get('/v1/users', { params: { limit: 1000 } })
      dispatch({ type: GET_ITEMS, payload: res.data })
    } catch (err) {
      console.error('Get error')
    }
  }

  // Add Item
  const addItem = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/v1/users', item, config)
      dispatch({ type: ADD_ITEM, payload: res.data })
    } catch (err) {
      console.error('Add error', err)
    }
  }

  // Update Item
  const updateItem = async (id, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/v1/users/${id}`, data, config)
      dispatch({ type: UPDATE_ITEM, payload: res.data })
    } catch (err) {
      console.error('Update error', err)
    }
  }

  // Delete Item
  const deleteItem = async id => {
    try {
      const res = await axios.delete(`/v1/users/${id}`)
      console.log(`Deleting item: ${id}`, res.data)
      dispatch({ type: DELETE_ITEM, payload: id })
    } catch (err) {
      console.error('Delete error')
    }
  }

  // Set Current Item
  const setCurrent = item => {
    dispatch({ type: SET_CURRENT, payload: item })
  }

  // Clear Current Item
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Clear All / Reset to Defaults
  const resetToDefault = () => {
    dispatch({ type: RESET_TO_DEFAULT, payload: initialState })
  }

  return (
    <itemContext.Provider
      value={{
        items: state.items,
        loading: state.loading,
        current: state.current,
        getItems,
        addItem,
        updateItem,
        deleteItem,
        setCurrent,
        clearCurrent,
        resetToDefault
      }}
    >
      {props.children}
    </itemContext.Provider>
  )
}
