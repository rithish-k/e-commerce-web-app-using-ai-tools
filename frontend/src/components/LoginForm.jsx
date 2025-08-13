import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginForm(){
        const [email,setEmail] = useState()
        const [password,setPassword] = useState()
        const navigate = useNavigate()
        const handleSubmit = (e) => {
            e.preventDefault()
            console.log({email, password });
            axios.post('http://localhost:3002/login',{email,password})
            .then(result => {
                console.log(result)
                if(result.data === "Success"){
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    
        }
        return(
            <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
                <div className='bg-white p-3 "shadow-sm" rounded w-25'>
                    <h2 className='text-center mb-4'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                <strong>Email</strong>
                            </label>
                            <input type='email' placeholder='Enter Email' autoComplete='off' name='email' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>
                                <strong>Password</strong>
                            </label>
                            <input type='password' placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div className='mb-3'>
                            <button type='submit' className='btn btn-outline-success w-100 rounded-0'>Login</button>
                        </div>
                    </form>
                    <p className='mb-3'>Don't Have an Account ? </p>
                    <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 '>Register</Link>
                </div>
            </div>
        )
}
export default LoginForm;