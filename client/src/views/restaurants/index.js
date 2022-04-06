import { useContext, useEffect, useState } from 'react'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Button } from 'reactstrap'
import Form from './Form'

const UsersPage = () => {
  const { restaurants, getRestaurants, addRestaurant, deleteRestaurant, updateRestaurant, resetToDefault } =
    useContext(restaurantContext)
  const [selectedRestaurant, setSelectedRestaurant] = useState({})
  const [openFormPanel, setOpenFormPanel] = useState(false)

  useEffect(() => {
    resetToDefault()
    getRestaurants()
  }, [])

  const handleFormPanel = () => setOpenFormPanel(!openFormPanel)

  const handleRestaurantClick = restaurant => {
    setSelectedRestaurant(restaurant)
    handleFormPanel()
  }

  const handleDelete = id => {
    deleteRestaurant(id)
  }

  return (
    <>
      <Button color='primary' className='m-1' onClick={handleFormPanel}>
        Add Restaurant
      </Button>

      <Table hover responsive>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Average Score</th>
            <th># of Reviews</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(restaurant => {
            return (
              <tr key={restaurant.id}>
                <td>{restaurant.title}</td>
                <td>{3.5}</td>
                <td>{'99'}</td>
                <td>
                  <Edit size={15} className='m-1' onClick={() => handleRestaurantClick(restaurant)} />
                  <Trash size={15} className='m-1' onClick={() => handleDelete(restaurant.id)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Form
        // store={store}
        // dispatch={dispatch}
        open={openFormPanel}
        addRestaurant={addRestaurant}
        updateRestaurant={updateRestaurant}
        deleteRestaurant={deleteRestaurant}
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
        handleFormPanel={handleFormPanel}
      ></Form>
    </>
  )
}

export default UsersPage
