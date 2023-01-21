import React , {  createContext , useState  , ReactNode , useEffect } from 'react'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig'
import Loader from '../ui-component/Loader';

import  type { User } from '../types/main'
interface InitializeContext{ 
    isAuth : boolean;
    user : User;
    setUser: React.Dispatch<React.SetStateAction<User>>
}


 
export const authContext = createContext<InitializeContext>({} as InitializeContext)

function AuthContext({children} : { children: ReactNode}) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>({} as User);

    useEffect(() =>{
       onAuthStateChanged(auth, (user) => {
           setIsLoading(true);
            if (user) {
              const { displayName , email , photoURL , phoneNumber  , uid} = user
              console.log('user' , user);
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