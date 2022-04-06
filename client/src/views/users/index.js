// import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import { useContext, useEffect } from 'react'
import { itemContext } from '../../utility/context/item/ItemState'

import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import classnames from 'classnames'

const SecondPage = () => {
  const { getItems, items } = useContext(itemContext)

  useEffect(() => {
    getItems()
  }, [])

  if (items.length === 0) {
    return <h4>Nothing to show</h4>
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>User</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.results.map(item => {
          return (
            <tr key={item.id}>
              <td>{item.email}</td>
              <td>
                <Badge pill className='me-1' color={item.role === 'admin' ? 'light-warning' : 'light-info'}>
                  {item.role}
                </Badge>
              </td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )

  // return (
  //   <div>
  //     {items.results.map(item => {
  //       return (
  //         <Card key={item.id}>
  //           <CardHeader>{item.email}</CardHeader>
  //           <CardBody>{item.role}</CardBody>
  //         </Card>
  //       )
  //     })}
  //   </div>
  // )
}

export default SecondPage
