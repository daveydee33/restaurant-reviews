import { useContext, useEffect, useState } from 'react'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'
import { Edit, Trash } from 'react-feather'
import { Table, Button } from 'reactstrap'
import Form from './Form'
import { useNavigate } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import BreadCrumbs from '@components/breadcrumbs'

const UsersPage = () => {
  const navigate = useNavigate()
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
    // setSelectedRestaurant(restaurant)
    // handleFormPanel()
    navigate(`/restaurants/${restaurant.id}`)
  }

  const handleEditClick = (e, restaurant) => {
    e.stopPropagation()
    setSelectedRestaurant(restaurant)
    handleFormPanel()
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    deleteRestaurant(id)
  }

  return (
    <>
      {/* <BreadCrumbs title='Restaurants' data={[]} /> */}
      <h1 className='my-1'>Restaurants</h1>

      <Button color='primary' className='m-1' onClick={handleFormPanel}>
        Add Restaurant
      </Button>

      <Table hover responsive>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Rating</th>
            <th>Avg Review</th>
            <th># of Reviews</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(restaurant => {
            return (
              <tr key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}>
                <td>{restaurant.title}</td>
                <td>
                  <StarRatings
                    rating={restaurant?.reviewAvg || 0}
                    starRatedColor='gold'
                    starDimension='1.5rem'
                    starSpacing='0'
                    className='m-5'
                  />
                </td>
                <td>{restaurant?.reviewAvg?.toFixed(1)}</td>
                <td>{restaurant?.reviews?.length}</td>
                <td>
                  <Edit size={15} className='m-1' onClick={e => handleEditClick(e, restaurant)} />
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
