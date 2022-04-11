import { useState, Fragment } from 'react'
import { X } from 'react-feather'
import { Modal, ModalBody, Button, Form, Input, Label } from 'reactstrap'
import StarRatings from 'react-star-ratings'
import Flatpickr from 'react-flatpickr'
import { isObjEmpty } from '@utils'
import '@styles/react/libs/react-select/_react-select.scss'

const ModalHeader = props => {
  const { children, handleFormPanel } = props
  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>{children}</h5>
      <div className='todo-item-action d-flex align-items-center'>
        <X className='font-weight-normal mt-25' size={16} onClick={handleFormPanel} />
      </div>
    </div>
  )
}

const FormPanel = props => {
  const { open, handleFormPanel, selectedReview, setSelectedReview, deleteReview, updateReview } = props

  const [rating, setRating] = useState()
  const [comment, setComment] = useState()
  const [dateVisited, setDateVisited] = useState()

  const handleResetFields = () => {
    const { rating, comment, dateVisited } = selectedReview
    setRating(rating)
    setComment(comment)
    setDateVisited(dateVisited)
  }

  const handleSidebarOpened = () => {
    if (!isObjEmpty(selectedReview)) {
      handleResetFields()
    }
  }

  const handleSidebarClosed = () => {
    setSelectedReview({})
  }

  const renderFooterButtons = () => {
    const payload = {
      rating,
      comment,
      dateVisited: dateVisited && new Date(dateVisited[0])
    }

    if (!isObjEmpty(selectedReview)) {
      return (
        <Fragment>
          <Button.Ripple
            color='primary'
            disabled={!rating || !comment || !dateVisited}
            className='m-1'
            onClick={() => {
              updateReview(selectedReview.restaurantId, selectedReview.reviewId, payload)
              handleFormPanel()
            }}
          >
            Update
          </Button.Ripple>

          {!isObjEmpty(selectedReview) ? (
            <Button.Ripple
              color='danger'
              className='m-1'
              onClick={() => {
                deleteReview(selectedReview.restaurantId, selectedReview.reviewId)
                handleFormPanel()
              }}
              outline
            >
              Delete
            </Button.Ripple>
          ) : null}
          <Button className='m-1' color='secondary' onClick={handleFormPanel} outline>
            Cancel
          </Button>
        </Fragment>
      )
    }
  }

  return (
    <Modal
      isOpen={open}
      toggle={handleFormPanel}
      className='sidebar-lg'
      contentClassName='p-0'
      onOpened={handleSidebarOpened}
      onClosed={handleSidebarClosed}
      modalClassName='modal-slide-in sidebar-todo-modal'
    >
      <Form id='form-modal-todo' className='todo-modal' onSubmit={e => e.preventDefault()}>
        <ModalHeader handleFormPanel={handleFormPanel}>Edit Review</ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <Label for='rating' className='mt-1'>
            Rating <span className='text-danger'>*</span>
          </Label>
          <div>
            <StarRatings
              rating={rating}
              starRatedColor='gold'
              starDimension='2rem'
              starSpacing='0'
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
          {renderFooterButtons()}
        </ModalBody>
      </Form>
    </Modal>
  )
}

export default FormPanel
