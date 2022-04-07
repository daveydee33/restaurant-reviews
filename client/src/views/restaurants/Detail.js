import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'
import StarRatings from 'react-star-ratings'

const SecondPage = () => {
  const params = useParams()
  const { id } = params
  const { getRestaurant, current } = useContext(restaurantContext)
  // const [restaurant, setRestaurant] = useState({})

  useEffect(async () => {
    getRestaurant(id)
  }, [])

  return (
    <>
      <h1>
        {id} - {current?.title}
      </h1>
      <StarRatings rating={current?.reviewAvg} starRatedColor='gold' starDimension='2rem' starSpacing='0' />
      <p>Total Reviews: {current?.reviews?.length}</p>
      <p>Average Score: {current?.reviewAvg}</p>

      {current?.reviews.map(review => {
        return (
          <Card key={review._id}>
            <CardHeader>
              <CardTitle>
                <StarRatings rating={review.rating} starRatedColor='gold' starDimension='1rem' starSpacing='0' />
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>{review.comment}</CardText>
              <CardText>{new Date(review.dateVisited).toDateString()}</CardText>
            </CardBody>
          </Card>
        )
      })}
    </>
  )
}

export default SecondPage
