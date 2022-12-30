import React from 'react'
import * as CurrencyFormat from 'react-currency-format';
function PriceFormat({value , type = 'text'} : { value: number , type?: 'text' | 'input'}) {
  return (
    <CurrencyFormat value={value} displayType={type} thousandSeparator={true} suffix={'₫'} />
  )
}

export default PriceFormat