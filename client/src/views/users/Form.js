import { useState, Fragment, useEffect } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import { X, Plus, Trash } from 'react-feather'
import CreatableSelect from 'react-select/creatable'
import Repeater from '@components/repeater'
import { Modal, ModalBody, Button, Form, FormGroup, Input, Label, FormFeedback, Alert } from 'reactstrap'
import Select from 'react-select'
import { isObjEmpty, selectThemeColors } from '@utils'
import '@styles/react/libs/react-select/_react-select.scss'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputPasswordToggle from '@components/input-password-toggle'

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

  const defaultValues = {
    email: 'some@email.com',
    password: 'aaaaaaa1',
    role: roleOptions[0]
  }

  // field validations
  const SignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        'password must contain at least 1 number and 1 letter'
      )
      .required()
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const [errorText, setErrorText] = useState('')

  const handleSidebarTitle = () => {
    if (!isObjEmpty(selectedItem)) {
      return 'Edit User'
    } else {
      return 'Add User'
    }
  }

  const onSubmit = formData => {
    const { email, password, role } = formData
    const data = {
      email,
      password,
      role: role.value
    }

    console.log('data', data)

    if (Object.values(data).every(field => field.length > 0)) {
      try {
        addItem(data)
        handleFormPanel()
      } catch (error) {
        console.log('ERROR')
        console.log(error)
      }

      // useJwt
      //   .register({ email, password })
      //   .then(res => {
      //     if (res.data.error) {
      //       for (const property in res.data.error) {
      //         if (res.data.error[property] !== null) {
      //           setError(property, {
      //             type: 'manual',
      //             message: res.data.error[property]
      //           })
      //         }
      //       }
      //     } else {
      //       const data = {
      //         ...res.data.user,
      //         accessToken: res.data.tokens.access.token,
      //         refreshToken: res.data.tokens.refresh.token
      //       }
      //       // ability.update(res.data.user.ability) // TODO:
      //       // dispatch(handleLogin(data))
      //       // navigate('/')
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err)
      //     setErrorText(err.response.data.message)
      //   })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
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
              // updateItem(selectedItem.id, payload)
              // handleFormPanel()
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
            // disabled={!email.length}
            className='add-todo-item m-1'
            // onClick={() => {
            //   handleSubmit(onSubmit)
            // }}
            type='submit'
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
      <Form action='/' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader
          // dispatch={dispatch}
          handleFormPanel={handleFormPanel}
        >
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <div className='mb-1'>
            <Label className='form-label' for='register-email'>
              Email
            </Label>
            <Controller
              id='email'
              name='email'
              control={control}
              render={({ field }) => (
                <Input type='email' placeholder='john@example.com' invalid={errors.email && true} {...field} />
              )}
            />
            {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : null}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='register-password'>
              Password
            </Label>
            <Controller
              id='password'
              name='password'
              control={control}
              render={({ field }) => (
                <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
              )}
            />
            {errors.password ? <FormFeedback>{errors.password.message}</FormFeedback> : null}
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='register-role'>
              Role
            </Label>

            <Controller
              id='role'
              name='role'
              control={control}
              render={({ field }) => (
                <Select
                  id='role'
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  // defaultValue={roleOptions[0]}
                  options={roleOptions}
                  isClearable={false}
                  invalid={errors.role && true}
                  {...field}
                />
              )}
            />
            {errors.role ? <FormFeedback>{errors.role.message}</FormFeedback> : null}
          </div>

          {errorText && (
            <Alert color='danger'>
              <div className='alert-body'>
                <span>{errorText}</span>
              </div>
            </Alert>
          )}

          {errorText && (
            <Alert color='danger'>
              <div className='alert-body'>
                {/* <span className='fw-bold'>Error</span> */}
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
