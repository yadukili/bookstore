import React, { useEffect, useState } from "react"
import axios from 'axios'
// import {  Link } from "react-router-dom"


function Signup() {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const handleSubmit =(e) => {
        e.preventDefault()
        axios.post('http://localhost:5555/users',{email,password})
        .then(result => console.log(result))
        
        .catch(err => console.log(err))
    }


    return (
        <div className="login">

            <h1>Signup</h1>

            <form onClick={handleSubmit}>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" autoComplete="on" />
                <button type="submit">register</button>
           </form>
            

            <br />
            <p>OR</p>
            <br />

            {/* <Link to="/login">Login Page</Link> */}

        </div>
    )
}

export default Signup
