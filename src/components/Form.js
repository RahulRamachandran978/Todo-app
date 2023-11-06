import React, { useRef, useState } from 'react'

function Form() {

    const [input,setInput] = useState("");
    const inputRef = useRef(null)

    const handleSubmit = (e) =>{
        e.preventDefault();
        setInput("")
        console.log(input)
    }
    const handleInput = (e) =>{
        setInput(e.target.value);
    }

  return (
    <div className='container'>
      <p>Enter Your Name</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInput} ref={inputRef}/>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Form
