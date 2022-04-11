// ** React Imports
import { Navigate } from 'react-router-dom'
import { useContext, Suspense } from 'react'

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  const user = JSON.parse(localStorage.getItem('userData'))

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false
    let adminOnly = false

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
      adminOnly = route.meta.adminOnly
    }
    if (!user && restrictedRoute) {
      return <Navigate to='/login' />
    }
    // if (user && restrictedRoute) {
    //   return <Navigate to='/restaurants' />
    // }
    if (user && restrictedRoute && adminOnly && user.role !== 'admin') {
      return <Navigate to='/auth/not-auth' replace />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
