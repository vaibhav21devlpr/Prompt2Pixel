import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Login')
    const {setShowLogin, backendUrl, setToken, setUser} = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        try {
            if(state === 'Forgot Password'){
                const {data} = await axios.post(
                    backendUrl + '/api/user/forgot-password',
                    {email}
                )

                if(data.success){
                    toast.success(data.message)
                }else{
                    toast.error(data.message)
                }
            } 
            else if(state === 'Login'){
                const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})

                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
            }else{
                const {data} = await axios.post(backendUrl + '/api/user/register', 
                    {name, email, password})

                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        document.body.style.overflow = 'hidden'

        return ()=>{
            document.body.style.overflow = 'unset'
        }
    },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm 
    bg-black/30 flex justify-center items-center'>
        <motion.form onSubmit={onSubmitHandler}
        initial={{opacity:0.2, y:50}}
        transition={{duration:0.3}}
        whileInView={{opacity:1, y:0}}
        viewport={{once: true}}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>
                {state}
            </h1>
            <p className='text-sm'>
            {
            state === 'Login'
                ? 'Welcome back! Please sign in to continue'
                : state === 'Sign Up'
                ? 'Welcome! Please create account to get started'
                : 'Enter your email and we’ll send a reset link'
            }
            </p>

            {state === 'Sign Up' && 
                <div className='px-5 py-2 flex items-center gap-2 rounded-full mt-5 shadow-md bg-white'>
                    <img width={23} src={assets.profile_icon} alt="Profile_icon" className="grayscale opacity-60"/>
                    <input onChange={e => setName(e.target.value)} value={name} 
                    type="text" className='outline-none text-sm ' 
                    placeholder='Full Name' required/>
                </div>
            }

            <div className='px-6 py-2 flex items-center gap-2 rounded-full mt-4 shadow-md bg-white'>
                <img src={assets.email_icon} alt="Email_icon" className='pr-1'/>
                <input onChange={e => setEmail(e.target.value)} value={email}
                type="email" className='outline-none text-sm'
                placeholder='Email id' required/>
            </div>

            {state !== 'Forgot Password' && (
                <div className='px-6 py-2 flex items-center gap-2 rounded-full mt-4 shadow-md bg-white'>
                    <img src={assets.lock_icon} alt="Lock_icon" className='pr-2'/>
                    <input onChange={e => setPassword(e.target.value)} value={password}
                    type="password" className='outline-none text-sm '
                    placeholder='Password' required/>
                </div>
            )}

            {state === 'Login' && (
                <p className='text-sm text-blue-600 my-4 cursor-pointer'
                onClick={() => setState('Forgot Password')}>
                    Forgot Password?
                </p>
            )}

            <button className='bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer mt-4'>
                {
                    state === 'Login' ? 'Login' : state === 'Forgot Password' ? 'Send Reset Link' : 'Create Account'
                }
            </button>

            {state === 'Login' ? <p className='mt-5 text-center'>
                Don't have an account? <span className='text-blue-600 
                cursor-pointer' onClick={()=>setState('Sign Up')}>Sign up</span>
            </p>
            :
            <p className='mt-5 text-center'>
                Already have an account? <span className='text-blue-600 
                cursor-pointer' onClick={()=>setState('Login')}>Login</span>
            </p>}

            <img src={assets.cross_icon} alt="Cross_icon" onClick={()=>setShowLogin(false)}
            className='absolute top-5 right-5 cursor-pointer'/>
        </motion.form>
    </div>
  )
}

export default Login