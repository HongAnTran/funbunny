import React from 'react'
import img from '../../assets/images/notfound/not.jpg'
function NotFound() {
  return (
    <div style={{display: 'flex' , justifyContent: 'center'  ,alignItems:'center'}}>
        <img width="500" height="500" src={img} alt="not found"></img>
    </div>
  )
}

export default NotFound