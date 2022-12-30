import { FieldValue } from "firebase/firestore"

type TypeTransaction = 'spending' | 'income'
type TypeWallet = 'cash' | 'saving' 
type Collections = 'users' | 'transactions'| 'categorys' | 'wallet' 
 
 
 interface User{
    uid : string
    email:string | null
    displayName:string | null
    photoURL:string| null
    phoneNumber :string| null
}

interface Wallet{
  uid:string
  total : number
  cash:number
  saving:number
  timestamp? : FieldValue
}

 interface Transaction{
  id?: string
  uid:string
  value :number
  typeTransaction : TypeTransaction
  idCategory : string
  wallet : TypeWallet
  date : Date
  note : string
  imageDescription : string
  timestamp? : FieldValue

}


 interface Category{
  id?:string  
  name:string
  icon:string
  typeTransaction : TypeTransaction
  timestamp? : FieldValue
}

export type { User,Transaction , Wallet ,Category ,TypeTransaction, TypeWallet ,Collections }
