import { useContext, useEffect } from 'react'
import { itemContext } from '../../utility/context/item/ItemState'

import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const UsersPage = () => {
  const { items, getItems, deleteItem, resetToDefault } = useContext(itemContext)

  useEffect(() => {
    resetToDefault()
    getItems()
  }, [])

  if (items.length === 0) {
    return <h4>Nothing to show</h4>
  }

  return (
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
            <tr key={item.id}>
              <td>{item.email}</td>
              <td>
                <Badge pill className='me-1' color={item.role === 'admin' ? 'light-warning' : 'light-info'}>
                  {item.role}
                </Badge>
              </td>
              <td>
                <Edit size={15} className='m-1' />
                <Trash size={15} className='m-1' onClick={() => deleteItem(item.id)} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default UsersPage
