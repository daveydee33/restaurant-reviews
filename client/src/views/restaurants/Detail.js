import { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'
import StarRatings from 'react-star-ratings'
import BreadCrumbs from '@components/breadcrumbs'

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
      <h1 className='my-1'>Restaurant Details</h1>
      <h4>
        <Link to='/'>{'< Back'}</Link>
      </h4>

      <Card className='text-center mb-3'>
        <CardBody>
          <h1>{current?.title}</h1>
          <CardText>Total Reviews: {current?.reviews?.length || 0}</CardText>
          <CardText>Average Score: {current?.reviewAvg?.toFixed(1)}</CardText>
          <StarRatings
            rating={current?.reviewAvg || 0}
            starRatedColor='gold'
            starDimension='2rem'
            starSpacing='0'
            className='m-5'
          />
        </CardBody>
      </Card>

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
