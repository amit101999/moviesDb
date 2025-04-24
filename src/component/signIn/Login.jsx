import React from 'react'
import { auth, provider } from '../../firebase'
import { signInWithPopup, signOut } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/users/userSlice'

const Login = ({ close }) => {

    const dispatch = useDispatch()

    const closeLogin = () => {
        // close
        close(false)
    }

    const handleSignIn = async () => {
        try {
            const res = await signInWithPopup(auth, provider)
            const user = {
                name: res.user.displayName,
                email: res.user.email
            }
            dispatch(addUser(user))
            close(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="absolute top-[20%] left-[35%] w-full bg-white shadow-xl rounded-md pt-2 px-6 pb-10 max-w-sm w-full text-center space-y-6">
            <div className='text-right'>
                <span onClick={closeLogin}
                    className='text-black font-bold text-2xl 
                hover:cursor-pointer hover:text-gray-700'>X</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your account</p>

            <div className="space-y-4">
                <button onClick={handleSignIn}
                    className="flex  bg-red-600 items-center justify-center w-full px-4 py-2 text-white border  rounded-lg shadow-sm hover:bg-red-400 transition">
                    <i class="ri-google-fill mr-2 text-xl"></i>
                    Sign in with Google
                </button>

                <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition">
                    <i class="ri-facebook-circle-fill mr-2 text-xl" ></i>
                    Sign in with Facebook
                </button>
            </div>
        </div>
    )
}

export default Login
