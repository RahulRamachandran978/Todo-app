import React from 'react'

function FunctionClick() {
    const ClickHandler = () =>{
        console.log('Button cliked')
    }
  return (
    <div className='container'>
      <button onClick={ClickHandler}>Click</button>
    </div>
  )
}

export default FunctionClick
