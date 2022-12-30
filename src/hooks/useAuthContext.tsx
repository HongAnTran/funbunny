import { useContext   } from 'react'
import { authContext } from '../contexts/AuthContext'

function useAuthContext() {
    return useContext(authContext)
}

export default useAuthContext