import React,{useState} from 'react'
import "../styles/Signup.css"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const { signup } = useAuth()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        if (password!==passwordConfirm){
            return setError('Passwords Do Not Match')
        }
        try{
            setError('')
            setLoading(true)
            await signup(email,password)
            navigate("/")
        }catch{
            setError('Failed to Create an Account')
        }
        setLoading(false)
    }

    return (
        <div className='signUp--page'>
            <form className='signUp--form' onSubmit={handleSubmit}>
                <h1 className='signUp--title'>Sign Up</h1>
                <div className='input--container'>
                    <label className='signUp--emailLabel'>Email: </label>
                    <input type="email" className='signUp--emailInput' onChange={(e)=>setEmail(e.target.value)}></input>
                    <label className='signUp--passwordLabel'>Password: </label>
                    <input className='signUp--passwordInput' type="password" onChange={(e)=>setPassword(e.target.value)}></input>
                    <label className='signUp--passwordConfirmLabel'>Password Confirmation: </label>
                    <input className='signUp--passwordConfirmInput' type="password" onChange={(e)=>setPasswordConfirm(e.target.value)}></input>
                </div>
                <div className="signUp--btnContainer">
                    <input className='signUp--submitBtn' type="submit" disabled={loading} value="Submit" />
                </div>
                <h3 className='signUp--loginText'>Already Have an Account? <Link to='/login'>Log In</Link></h3>
                {error!==''&&<h1>{error}</h1>}
            </form>
        </div>
    )
}
