import { useContext, useEffect, useState } from 'react'
import { itemContext } from '../../utility/context/item/ItemState'
import { Edit, Trash } from 'react-feather'
import { Table, Badge, Button } from 'reactstrap'
import Form from './Form'

const UsersPage = () => {
  const { items, getItems, addItem, deleteItem, updateItem, resetToDefault } = useContext(itemContext)
  const [selectedItem, setSelectedItem] = useState({})
  const [openFormPanel, setOpenFormPanel] = useState(false)

  useEffect(() => {
    resetToDefault()
    getItems()
  }, [])

  const handleFormPanel = () => setOpenFormPanel(!openFormPanel)

  const handleItemClick = item => {
    setSelectedItem(item)
    handleFormPanel()
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    deleteItem(id)
  }

  return (
    <>
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
          {items.map(item => {
            return (
              <tr key={item.id} onClick={() => handleItemClick(item)}>
                <td>{item.email}</td>
                <td>
                  <Badge pill className='me-1' color={item.role === 'admin' ? 'light-warning' : 'light-info'}>
                    {item.role}
                  </Badge>
                </td>
                <td>
                  <Edit size={15} className='m-1' />
                  <Trash size={15} className='m-1' onClick={e => handleDelete(e, item.id)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Form
        open={openFormPanel}
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        handleFormPanel={handleFormPanel}
      />
    </>
  )
}

export default UsersPage
