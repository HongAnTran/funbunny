import React from 'react'
import { Wallet } from 'types/main'
import PriceFormat from "ui-component/extended/PriceFormat";

function ViewWallet({data} : {data : Wallet}) {
  return (
    <div>
        <div>
          <span>Cash</span>
          <PriceFormat value={data.cash}></PriceFormat>
        </div>
        <div>
        <span>Saving</span>

          <PriceFormat value={data.saving}></PriceFormat>
        </div>

    </div>
  )
}

export default ViewWallet