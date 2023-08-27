import type { Timestamp, WhereFilterOp ,OrderByDirection} from "firebase/firestore"


type TypeTransaction = 'spending' | 'income'
type TypeWallet = 'cash' | 'saving' 
type Collections = 'users' | 'transactions'| 'categorys' | 'wallet' | 'taskItem'
 
 


 interface User{
  _id?: string
    uid : string
    email:string | null
    displayName:string | null
    photoURL:string| null
    phoneNumber :string| null
}

interface Wallet{
  _id?: string
  uid:string
  cash:number
  saving:number
  timestamp? : Timestamp
}

 interface Transaction{
  _id?: string
  uid:string
  value :number
  typeTransaction : TypeTransaction
  idCategory : string
  wallet : TypeWallet
  note : string
  imageDescription : string
  timestamp? : Timestamp
  date :DateTransaction
  // [x : string ] : any
  // category?:Category
}

interface DateTransaction  {
  day: number,
  month: number,
  year: number,
  time:number,
  date:Date
}


 interface Category{
    id: string
    name:string
    icon:string
    typeTransaction : TypeTransaction
  timestamp? : Timestamp
}

interface FinaceSlice{
  wallet : Wallet
  transactions: Transaction[]
  income : number
  spending : number
}
interface Condition<T >  {
  fieldname : keyof T  | string,
  operation : WhereFilterOp,
  value :  any
  
}

interface Order {
  fieldName : string;
  type : OrderByDirection 
}

// interface TaskTable {
//   id : string;
//   uid:string
//   title:string
//   isStar:boolean
//   createdAt : Date
// }
// interface TaskList {
//   idTable : string
//   order:number
//   title:string
// }

interface TaskItem {
  idList : 1 | 2 | 3
  order:number
  title:string
  description?:string
  createdAt : Date
}

export type { User,Transaction , Wallet ,Category ,TypeTransaction, TypeWallet ,Collections ,FinaceSlice , Condition ,Order ,TaskItem}
