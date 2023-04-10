import { useEffect, useMemo, useState } from "react";
import { Collections, Condition, Transaction } from "../types/main";
import { db } from "../firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  OrderByDirection,
} from "firebase/firestore";
function addWhere(arr: Condition<Transaction>[]) {
    const data = arr.map((item) => {
        return where(item.fieldname, item.operation, item.value);
      })
  return data
}
//  neu ko gioi han truyen vao ko
const useGetDocs = <T,>(
  collectionName: Collections,
  initialdata: T[],
  conditions: Condition<Transaction>[],
  limitDoc: number,
  order?: { type: OrderByDirection; field: string },
  ...args: any[]
): [T[], boolean, boolean] => {
  const [data, setData] = useState<T[]>(initialdata);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);




  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let q;

     
        if (limitDoc === 0) {
            q = query(collection(db, collectionName), ...addWhere(conditions));
            if (order) {
              q = query(
                collection(db, collectionName),
                ...addWhere(conditions),
                orderBy(order.field, order.type),
              );
            }
          }else{
            q = query(
                collection(db, collectionName),
                ...addWhere(conditions),
                limit(limitDoc)
              );
      
              if (order) {
                q = query(
                  collection(db, collectionName),
                  ...addWhere(conditions),
                  orderBy(order.field, order.type),
                  limit(limitDoc)
                );
              }
             
          }
        const querySnapshot = await getDocs(q);
        let arr: T[] = [];
        querySnapshot.forEach((doc) => {
          arr.push({
            ...(doc.data() as T),
            _id: doc.id,
          });
        });
        setData(arr);
      } catch (error) {
        setIsError(true);
        console.log(error);
        alert(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [
    collectionName,
    JSON.stringify(conditions),
    limitDoc,
    JSON.stringify(order),
    order?.field,
    order?.type,
  ]);

  return [data, isLoading, isError];
};

export default useGetDocs;
