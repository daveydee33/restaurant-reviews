import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'

const SecondPage = () => {
  const params = useParams()
  const { id } = params
  const { getRestaurant, current } = useContext(restaurantContext)
  // const [restaurant, setRestaurant] = useState({})

  useEffect(async () => {
    getRestaurant(id)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {id} - {current?.title} 🙌
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>This is your second page.</CardText>
        <CardText>
          Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot cake dragée chupa chups jujubes.
          Macaroon liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.
        </CardText>
      </CardBody>
    </Card>
  )
}

export default SecondPage
