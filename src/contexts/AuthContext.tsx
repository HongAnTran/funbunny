import React , { useContext , createContext , useState  , ReactNode , useEffect } from 'react'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import Loader from '../ui-component/Loader';

import  type { User } from '../types/interface'
interface InitializeContext{ 
    isAuth : boolean;
    user : User;
    setUser: React.Dispatch<React.SetStateAction<User>>
}



const authContext = createContext<InitializeContext>({} as InitializeContext)
export const useAuthContext = () =>{
    return useContext(authContext)
}
function AuthContext({children} : { children: ReactNode}) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>({} as User);

    useEffect(() =>{
       onAuthStateChanged(auth, (user) => {
           setIsLoading(true);
            if (user) {
              const { displayName , email , photoURL , phoneNumber  , uid} = user
              setUser({ displayName , email , photoURL , phoneNumber  , uid})
              setIsAuth(true);
            } else {
              setIsAuth(false);
              setUser({} as User);
            }
             setIsLoading(false);
          });
         
    },[])

   
  return (
  <authContext.Provider value={{isAuth ,user , setUser }}>
    {isLoading ? <Loader />: children}
  </authContext.Provider>
  )
}

export default AuthContext