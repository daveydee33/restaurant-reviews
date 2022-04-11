import { useState, Fragment } from 'react'
import { X } from 'react-feather'
import { Modal, ModalBody, Button, Form, FormGroup, Input, Label } from 'reactstrap'
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
  const {
    open,
    handleFormPanel,
    selectedRestaurant,
    setSelectedRestaurant,
    addRestaurant,
    deleteRestaurant,
    updateRestaurant
  } = props

  const [title, setTitle] = useState('')

  const handleSidebarTitle = () => {
    if (!isObjEmpty(selectedRestaurant)) {
      return 'Edit Restaurant'
    } else {
      return 'Add Restaurant'
    }
  }

  const handleResetFields = () => {
    const { title } = selectedRestaurant
    setTitle(title)
  }

  const handleSidebarOpened = () => {
    if (!isObjEmpty(selectedRestaurant)) {
      handleResetFields()
    }
  }

  const handleSidebarClosed = () => {
    setTitle('')
    setSelectedRestaurant({})
  }

  const renderFooterButtons = () => {
    const payload = {
      title
    }

    if (!isObjEmpty(selectedRestaurant)) {
      return (
        <Fragment>
          <Button.Ripple
            color='primary'
            disabled={!title.length}
            className='m-1'
            onClick={() => {
              updateRestaurant(selectedRestaurant.id, payload)
              handleFormPanel()
            }}
          >
            Update
          </Button.Ripple>

          {!isObjEmpty(selectedRestaurant) ? (
            <Button.Ripple
              color='danger'
              className='m-1'
              onClick={() => {
                deleteRestaurant(selectedRestaurant.id)
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
    } else {
      return (
        <Fragment>
          <Button
            color='primary'
            disabled={!title.length}
            className='add-todo-item m-1'
            onClick={() => {
              addRestaurant(payload)
              handleFormPanel()
            }}
          >
            Create
          </Button>
          <Button color='secondary' onClick={handleFormPanel} outline>
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
        <ModalHeader handleFormPanel={handleFormPanel}>{handleSidebarTitle()}</ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <FormGroup>
            <Label for='title' className='form-label'>
              Title <span className='text-danger'>*</span>
            </Label>
            <Input
              id='title'
              value={title}
              placeholder='Title'
              className='new-todo-item-title'
              onChange={e => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='my-1'>{renderFooterButtons()}</FormGroup>
        </ModalBody>
      </Form>
    </Modal>
  )
}

export default FormPanel
