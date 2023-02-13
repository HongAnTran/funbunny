
import React from "react";
import { Category, TypeTransaction } from "types/main";
import { expenseCategory , incomeCategory } from 'constans/categories'

export default function CategoryTransaction({
  idCategory,
  type
}: {
  idCategory: string;
  type:TypeTransaction
}) {

    // const [category , setCategory] = useState<Category>({} as Category)
    // useEffect(() =>{
    //   if(type === 'income'){
    //     const cate = incomeCategory.find((item) => item.id === idCategory)
    //     if(cate){
    //       setCategory(cate)
    //     }
    //   }else{
    //     const cate = expenseCategory.find((item) => item.id === idCategory)
    //     if(cate){
    //       setCategory(cate)
    //     }
    //   }
    // },[type , idCategory])  

    let category : Category = { } as Category
        if(type === 'income'){
        const cate = incomeCategory.find((item) => item.id === idCategory)
        if(cate){
          category = cate
        }
      }else{
        const cate = expenseCategory.find((item) => item.id === idCategory)
        if(cate){
          category = cate

        }
      }
  return (
    <>
   
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            width={26}
            src={category.icon}
            alt={category.name}
            style={{ marginRight: 6 }}
          />
          <span>{category.name}</span>
        </div>
      
    </>
  );
}
