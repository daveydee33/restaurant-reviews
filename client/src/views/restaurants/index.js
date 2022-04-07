import { useContext, useEffect, useState } from 'react'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'
import { Edit, Trash } from 'react-feather'
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

  const handleDelete = (e, id) => {
    e.stopPropagation()
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
              <tr key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}>
                <td>{restaurant.title}</td>
                <td>{3.5}</td>
                <td>{'99'}</td>
                <td>
                  <Edit size={15} className='m-1' />
                  <Trash size={15} className='m-1' onClick={e => handleDelete(e, restaurant.id)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Form
        open={openFormPanel}
        addRestaurant={addRestaurant}
        updateRestaurant={updateRestaurant}
        deleteRestaurant={deleteRestaurant}
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
        handleFormPanel={handleFormPanel}
      />
    </>
  )
}

export default UsersPage
