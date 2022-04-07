import { useState, Fragment, useEffect } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import { X, Plus, Trash } from 'react-feather'
import CreatableSelect from 'react-select/creatable'
import Repeater from '@components/repeater'
import { Modal, ModalBody, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Select from 'react-select'
import { isObjEmpty, selectThemeColors } from '@utils'
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
  const { open, handleFormPanel, selectedItem, setSelectedItem, addItem, deleteItem, updateItem } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const roleOptions = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' }
  ]

  const handleSidebarTitle = () => {
    if (!isObjEmpty(selectedItem)) {
      return 'Edit Item'
    } else {
      return 'Add Item'
    }
  }

  const handleResetFields = () => {
    const { email } = selectedItem
    setEmail(email)
  }

  const handleSidebarOpened = () => {
    if (!isObjEmpty(selectedItem)) {
      handleResetFields()
    }
  }

  const handleSidebarClosed = () => {
    setEmail('')
    setPassword('')
    setSelectedItem({})
  }

  const renderFooterButtons = () => {
    const payload = {
      email,
      password
    }

    if (!isObjEmpty(selectedItem)) {
      return (
        <Fragment>
          <Button.Ripple
            color='primary'
            disabled={!email.length}
            className='m-1'
            onClick={() => {
              updateItem(selectedItem.id, payload)
              handleFormPanel()
            }}
          >
            Update
          </Button.Ripple>
          {/* <Button.Ripple color='secondary' onClick={handleResetFields} outline>
            Reset
          </Button.Ripple> */}

          {!isObjEmpty(selectedItem) ? (
            <Button.Ripple
              color='danger'
              className='m-1'
              onClick={() => {
                deleteItem(selectedItem.id)
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
            disabled={!email.length}
            className='add-todo-item m-1'
            onClick={() => {
              addItem(payload)
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
        <ModalHeader
          // dispatch={dispatch}
          handleFormPanel={handleFormPanel}
        >
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <FormGroup>
            <Label for='email' className='form-label'>
              Email <span className='text-danger'>*</span>
            </Label>
            <Input id='email' value={email} placeholder='email' onChange={e => setEmail(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for='password' className='form-label'>
              Password <span className='text-danger'>*</span>
            </Label>
            <Input id='password' value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for='role' className='form-label'>
              Role
            </Label>
            <Select
              id='role'
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={roleOptions[0]}
              options={roleOptions}
              isClearable={false}
            />
          </FormGroup>

          <FormGroup className='my-1'>{renderFooterButtons()}</FormGroup>
        </ModalBody>
      </Form>
    </Modal>
  )
}

export default FormPanel
