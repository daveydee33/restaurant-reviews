import { useContext, useEffect, useState } from 'react'
import { userContext } from '../../utility/context/user/UserState'
import { Edit, Trash } from 'react-feather'
import { Table, Badge, Button } from 'reactstrap'
import Form from './Form'

const UsersPage = () => {
  const { users, getUsers, addUser, deleteUser, updateUser, resetToDefault } = useContext(userContext)
  const [selectedUser, setSelectedUser] = useState({})
  const [openFormPanel, setOpenFormPanel] = useState(false)

  useEffect(() => {
    resetToDefault()
    getUsers()
  }, [])

  const handleFormPanel = () => setOpenFormPanel(!openFormPanel)

  const handleUserClick = user => {
    setSelectedUser(user)
    handleFormPanel()
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    deleteUser(id)
  }

  return (
    <>
      <h1 className='my-1'>Users</h1>
      <Button color='primary' className='m-1' onClick={handleFormPanel}>
        Add User
      </Button>
      <Table hover responsive>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id} onClick={() => handleUserClick(user)}>
                <td>{user.email}</td>
                <td>
                  <Badge pill className='me-1' color={user.role === 'admin' ? 'light-warning' : 'light-info'}>
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <Edit size={15} className='m-1' />
                  <Trash size={15} className='m-1' onClick={e => handleDelete(e, user.id)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Form
        open={openFormPanel}
        addUser={addUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleFormPanel={handleFormPanel}
      />
    </>
  )
}

export default UsersPage
