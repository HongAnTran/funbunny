import React from 'react'
import * as CurrencyFormat from 'react-currency-format';
function PriceFormat({value , type = 'text' , isSuffix  = true , allowNegative = true , ...res} : { value: number ,isSuffix?  : boolean, type?: 'text' | 'input' , [x:string] : any}) {
  return (
    <CurrencyFormat 
    allowNegative={allowNegative}
    value={value} displayType={type} thousandSeparator={true} suffix={isSuffix ?  'đ' : ''} {...res} />
  )
}

export default PriceFormat