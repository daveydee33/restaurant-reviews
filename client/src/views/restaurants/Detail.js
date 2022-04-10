import { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row
} from 'reactstrap'
import { restaurantContext } from '../../utility/context/restaurant/RestaurantState'
import ReviewForm from './ReviewForm'
import StarRatings from 'react-star-ratings'
import Flatpickr from 'react-flatpickr'
import BreadCrumbs from '@components/breadcrumbs'
import { isAdmin } from '../../auth/utils'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const SecondPage = () => {
  const params = useParams()
  const { id } = params
  const { getRestaurant, current, submitReview, deleteReview, updateReview } = useContext(restaurantContext)
  const [rating, setRating] = useState()
  const [comment, setComment] = useState()
  const [dateVisited, setDateVisited] = useState()
  const [selectedReview, setSelectedReview] = useState({})
  const [openFormPanel, setOpenFormPanel] = useState(false)

  useEffect(async () => {
    getRestaurant(id)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = { rating, comment, dateVisited: dateVisited[0] }
    try {
      await submitReview(id, payload)
      setRating()
      setComment('')
      setDateVisited()
      getRestaurant(id)
    } catch (error) {
      // TODO:
      console.error('Error submitting review')
      console.error(error)
    }
  }

  const handleFormPanel = () => setOpenFormPanel(!openFormPanel)

  const handleSelectReview = (e, reviewData) => {
    e.stopPropagation()
    setSelectedReview(reviewData)
    handleFormPanel()
  }

  const handleDelete = async (e, restaurantId, reviewId) => {
    e.preventDefault()
    await deleteReview(restaurantId, reviewId)
    getRestaurant(id)
  }

  return (
    <>
      <h1 className='my-1'>Restaurant Details</h1>
      <h4>
        <Link to='/'>{'< Back'}</Link>
      </h4>

      <Card className='text-center mb-3'>
        <CardBody>
          <h1>{current?.title}</h1>
          <StarRatings
            rating={current?.reviewAvg || 0}
            starRatedColor='gold'
            starDimension='2rem'
            starSpacing='0'
            className='m-5'
          />
          <Row className='mt-1'>
            <Col>
              Total Reviews:
              <div>{current?.reviewCount}</div>
            </Col>
            <Col>
              Highest Review:
              <div>{current?.reviewMax}</div>
            </Col>
            <Col>
              Lowest Review:
              <div>{current?.reviewMin}</div>
            </Col>
            <Col>
              Most Recent:
              <div>{current?.reviews?.sort((a, b) => a.reviewDate - b.reviewDate)[0]?.rating}</div>
            </Col>
            <Col>
              Average Score:
              <div>{current?.reviewAvg?.toFixed(1)}</div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='border-warning'>
        <CardHeader>
          <CardTitle>Submit a Review</CardTitle>
        </CardHeader>
        <CardBody>
          <Form id='form-modal-todo' className='todo-modal' onSubmit={e => handleSubmit(e)}>
            <Label for='rating' className='mt-1'>
              Rating <span className='text-danger'>*</span>
            </Label>
            {/* <Input id='rating' value={rating} placeholder='rating' onChange={e => setRating(e.target.value)} /> */}
            <div>
              <StarRatings
                rating={rating}
                starRatedColor='gold'
                starDimension='2rem'
                starSpacing='0'
                // className='m-5'
                changeRating={val => setRating(val)}
              />
            </div>

            <Label for='rating' className='mt-1'>
              Date Visited <span className='text-danger'>*</span>
            </Label>
            <Flatpickr
              id='default-picker'
              className='form-control'
              value={dateVisited}
              options={{
                // altInput: true,
                // altFormat: 'F j, Y',
                // dateFormat: 'Y-m-d',
                maxDate: 'today'
              }}
              onChange={date => setDateVisited(date)}
            />

            <Label for='comment' className='mt-1'>
              Comment <span className='text-danger'>*</span>
            </Label>
            <Input
              id='comment'
              type='textarea'
              value={comment}
              placeholder='comment'
              onChange={e => setComment(e.target.value)}
            />
            <Button type='submit' color='primary' className='mt-1' disabled={!rating || !dateVisited || !comment}>
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* <span className='text-right'>Total Reviews: {current?.reviews?.length}</span> */}
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
              {/* <CardText>{new Date(review.dateVisited).toDateString()}</CardText> */}
              <CardText>{new Date(review.dateVisited).toISOString().split('T')[0]}</CardText>
              <CardText>
                {isAdmin() && (
                  <>
                    <Button
                      color='flat-warning'
                      size='sm'
                      onClick={e =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        handleSelectReview(e, {
                          restaurantId: current.id,
                          reviewId: review._id,
                          rating: review.rating,
                          comment: review.comment,
                          dateVisited: review.dateVisited
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button color='flat-danger' size='sm' onClick={e => handleDelete(e, current.id, review._id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardText>
            </CardBody>
          </Card>
        )
      })}
      <ReviewForm
        open={openFormPanel}
        handleFormPanel={handleFormPanel}
        selectedReview={selectedReview}
        setSelectedReview={setSelectedReview}
        updateReview={updateReview}
        deleteReview={deleteReview}
      />
    </>
  )
}

export default SecondPage
