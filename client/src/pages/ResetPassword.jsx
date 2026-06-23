import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const ResetPassword = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    const { backendUrl } = useContext(AppContext)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            return toast.error("Passwords do not match")
        }

        try {

            const { data } = await axios.post(
                `${backendUrl}/api/user/reset-password/${token}`,
                { password }
            )

            if(data.success){
                toast.success("Password reset successful")
                navigate('/')
            }else{
                toast.error(data.message)
            }

        } catch(error){
            toast.error(error.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={submitHandler}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h1 className="text-2xl font-semibold text-center mb-5">
                    Reset Password
                </h1>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default ResetPassword