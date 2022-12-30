
import {  Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks'
function PublicRouter({children } :{ children : any}) {
  const { isAuth } = useAuthContext()
  return (
    isAuth ?  <Navigate  to='/'/> : children
   )
}

export default PublicRouter