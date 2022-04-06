import { useContext, useEffect } from 'react'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'

import { MoreVertical, Edit, Trash } from 'react-feather'
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  Dropdownrestaurant,
  DropdownToggle,
  Card,
  Button
} from 'reactstrap'

const UsersPage = () => {
  const { getRestaurants, restaurants, resetToDefault } = useContext(restaurantContext)

  useEffect(() => {
    resetToDefault()
    getRestaurants()
  }, [])

  if (restaurants.length === 0) {
    return <div />
  }

  return (
    <>
      <Button color='primary' className='m-1'>
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
                  <Edit size={15} className='m-1' />
                  <Trash size={15} className='m-1' />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default UsersPage
