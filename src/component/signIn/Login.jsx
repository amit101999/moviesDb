import React from 'react'
import { createPortal } from 'react-dom'
import { auth, provider } from '../../firebase'
import { signInWithPopup, signOut } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/users/userSlice'

const Login = ({ close }) => {

    const dispatch = useDispatch()

    const closeLogin = () => {
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

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeLogin()
        }
    }

    const loginModal = (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={handleBackdropClick}
            ></div>
            
            {/* Modal positioned at top */}
            <div className="fixed top-20 sm:top-24 left-0 right-0 z-[10000] flex justify-end sm:justify-center px-4 sm:px-6 animate-slideDown pointer-events-none">
                <div className="relative w-full max-w-md pointer-events-auto">
                    {/* Modal Container */}
                    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
                    
                    {/* Decorative top border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    {/* Content */}
                    <div className="relative p-6 sm:p-8 space-y-6">
                        {/* Close Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={closeLogin}
                                className="group relative p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 transition-all duration-200 hover:scale-110"
                            >
                                <i className="ri-close-line text-gray-400 group-hover:text-white text-xl transition-colors duration-200"></i>
                            </button>
                        </div>

                        {/* Header Section */}
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-3 shadow-lg">
                                <i className="ri-movie-2-fill text-white text-2xl sm:text-3xl"></i>
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Sign in to continue your movie journey
                            </p>
                        </div>

                        {/* Sign In Buttons */}
                        <div className="space-y-3 pt-2">
                            <button
                                onClick={handleSignIn}
                                className="group relative w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-gray-200"
                            >
                                <i className="ri-google-fill text-xl sm:text-2xl text-red-500"></i>
                                <span className="text-sm sm:text-base">Sign in with Google</span>
                                <i className="ri-arrow-right-line ml-auto text-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200"></i>
                            </button>

                            <button
                                className="group relative w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
                            >
                                <i className="ri-facebook-circle-fill text-xl sm:text-2xl"></i>
                                <span className="text-sm sm:text-base">Sign in with Facebook</span>
                                <i className="ri-arrow-right-line ml-auto text-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200"></i>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="pt-3 border-t border-gray-700/50">
                            <p className="text-center text-xs sm:text-sm text-gray-500">
                                By signing in, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )

    return createPortal(loginModal, document.body)
}

export default Login
