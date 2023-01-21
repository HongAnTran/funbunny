import React from 'react'
import * as CurrencyFormat from 'react-currency-format';
function PriceFormat({value , type = 'text' , isSuffix  = true , ...res} : { value: number ,isSuffix?  : boolean, type?: 'text' | 'input' , [x:string] : any}) {
  return (
    <CurrencyFormat value={value} displayType={type} thousandSeparator={true} suffix={isSuffix ?  '₫' : ''} {...res} />
  )
}

export default PriceFormat