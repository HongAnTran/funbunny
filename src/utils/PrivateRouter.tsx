import {  Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'


function PrivateRouter({children } :{ children : any}) {
    const { isAuth } = useAuthContext()
      return (
        isAuth ? children : <Navigate  to='/login'/>
      )
}

export default PrivateRouter