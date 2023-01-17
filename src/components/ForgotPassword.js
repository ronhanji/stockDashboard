import React,{useEffect, useState} from 'react'
import "../styles/forgotPass.css"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const { resetPassword } = useAuth()
    const [email,setEmail] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        resetPassword(email)
    }
    return (
        <form className='forgotPass--form' onSubmit={handleSubmit}>
            <h1 className='forgotPass--title'>Password Reset</h1>
            
            <label className='forgotPass--emailLabel'>Email: </label>
            <input type="email" className='forgotPass--emailInput' onChange={(e)=>setEmail(e.target.value)}></input>
            {/*FIX*/}
            <input className="forgotPass--submitBtn" type="submit" value="Submit" ></input>
            <h3 className="forgotPass--signUpText">Need an Account? <Link to='/signup'>Sign Up</Link></h3>
            {error!==''&&<h1>{error}</h1>}

        </form>
    )
}
