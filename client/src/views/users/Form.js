import { useState, Fragment, useEffect } from 'react'
import { X, Plus, Trash } from 'react-feather'
import { Modal, ModalBody, Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap'
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
  const { open, handleFormPanel, selectedUser, setSelectedUser, addUser, deleteUser, updateUser } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState()
  const [errorText, setErrorText] = useState()

  const roleOptions = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' }
  ]

  const handleSidebarTitle = () => {
    if (!isObjEmpty(selectedUser)) {
      return 'Edit User'
    } else {
      return 'Add User'
    }
  }

  const handleSubmit = async () => {
    const payload = {
      email,
      password,
      role: role?.value
    }

    try {
      const res = await addUser(payload)
      if (!res) {
        handleFormPanel()
      } else {
        setErrorText(res)
      }
    } catch (error) {
      console.log('ERROR')
      console.log(error)
    }
  }

  const handleResetFields = () => {
    const { email, role } = selectedUser
    setEmail(email)
    setPassword()
    setRole({ label: role, value: role })
  }

  const handleSidebarOpened = () => {
    if (!isObjEmpty(selectedUser)) {
      handleResetFields()
    }
  }

  const handleSidebarClosed = () => {
    setEmail()
    setPassword()
    setRole()
    setSelectedUser({})
  }

  const renderFooterButtons = () => {
    const payload = {
      email,
      password,
      role: role?.value
    }

    if (!isObjEmpty(selectedUser)) {
      return (
        <Fragment>
          <Button.Ripple
            color='primary'
            // disabled={!email.length}
            className='m-1'
            onClick={() => {
              updateUser(selectedUser.id, payload)
              handleFormPanel()
            }}
          >
            Update
          </Button.Ripple>
          {/* <Button.Ripple color='secondary' onClick={handleResetFields} outline>
            Reset
          </Button.Ripple> */}

          {!isObjEmpty(selectedUser) ? (
            <Button.Ripple
              color='danger'
              className='m-1'
              onClick={() => {
                deleteUser(selectedUser.id)
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
            // disabled={!email.length}
            className='add-todo-item m-1'
            onClick={() => {
              handleSubmit()
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
          <Label for='email' className='form-label'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Input id='email' value={email} placeholder='Title' onChange={e => setEmail(e.target.value)} />

          <Label for='password' className='form-label mt-2'>
            Password
          </Label>
          <Input
            id='password'
            value={password}
            placeholder='password'
            onChange={e => setPassword(e.target.value)}
            type='password'
          />

          <Label for='role' className='form-label  mt-2'>
            Role
          </Label>
          <Select
            id='role'
            theme={selectThemeColors}
            className='react-select'
            classNamePrefix='select'
            // defaultValue={roleOptions[0]}
            value={role}
            options={roleOptions}
            isClearable={false}
            onChange={obj => setRole(obj)}
          />

          {errorText && (
            <Alert color='danger' className='mt-2'>
              <div className='alert-body'>
                <span>{errorText}</span>
              </div>
            </Alert>
          )}

          <FormGroup className='my-1'>{renderFooterButtons()}</FormGroup>
        </ModalBody>
      </Form>
    </Modal>
  )
}

export default FormPanel
