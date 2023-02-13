import { Timestamp } from 'firebase/firestore'
import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone';
function FormatTime({time } : {time : number}) {

    return (
    <div>
         <Moment format="HH:mm - DD-MM-YYYY">
                {time}
            </Moment>
    </div>
  )
}

export default FormatTime