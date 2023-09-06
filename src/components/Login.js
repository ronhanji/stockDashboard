import React,{useEffect, useState} from 'react'
import "../styles/Login.css"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const { login, currentUser } = useAuth()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(email,password)
            navigate("/")
        }catch(err){
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    useEffect(()=>{
        console.log(currentUser)
      },[])
    return (
        <form className='login--form' onSubmit={handleSubmit}>
            <h1 className='login--title'>Log In</h1>
            
            <label className='login--emailLabel'>Email: </label>
            <input type="email" className='login--emailInput' onChange={(e)=>setEmail(e.target.value)}></input>
            <label className='login--passwordLabel'>Password: </label>
            <input className='login--passwordInput' type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <input className='login--submitBtn' type="submit" disabled={loading} value="Log In" />
            <Link to="/forgot-password"><h4>Forgot Password?</h4></Link>
            <h3 className='login--loginText'>Need an Account? <Link to='/signup'>Sign Up</Link></h3>
            {error!==''&&<h1>{error}</h1>} 
        </form>
    )
}
