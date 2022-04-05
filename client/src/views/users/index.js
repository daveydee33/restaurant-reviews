import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import { useContext, useEffect, useState } from 'react'
import { itemContext } from '../../utility/context/item/ItemState'

const SecondPage = () => {
  const { getItems, items } = useContext(itemContext)

  useEffect(() => {
    getItems()
  }, [])

  if (items.length === 0) {
    return <h4>...</h4>
  }

  return (
    <div>
      {items.results.map(item => {
        return (
          <Card key={item.id}>
            <CardHeader>{item.email}</CardHeader>
            <CardBody>{item.role}</CardBody>
          </Card>
        )
      })}
      <Card>
        <CardHeader>
          <CardTitle>Kick start your project 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            Please make sure to read our{' '}
            <CardLink
              href='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/'
              target='_blank'
            >
              Template Documentation
            </CardLink>{' '}
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Want to integrate JWT? 🔒</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.
          </CardText>
          <CardText>
            Please read our{' '}
            <CardLink
              href='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/docs/development/auth'
              target='_blank'
            >
              JWT Documentation
            </CardLink>{' '}
            to get more out of JWT authentication.
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default SecondPage
