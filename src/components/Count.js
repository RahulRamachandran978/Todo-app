import React, { useState } from 'react'
import './Todo.css'

function Count() {
  const[count,setCount] = useState(0)

  const increaseCount = () =>{
    setCount(count+1);
  }
  const decreaseCount = () =>{
    setCount(count-1)
  }
  return (
    <div className='container'>
      <p style={{color:'white'}}>{count}</p>
      <br />
      <button onClick={increaseCount}>+</button>
      
      <button onClick={decreaseCount}>-</button>
    </div>
  )
}

export default Count


