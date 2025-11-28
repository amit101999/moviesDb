import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from "axios"
import { baseURL } from "../Apis/MovieApi";
import { MovieApiKey } from '../Apis/MovieApiKey';
import { addMovies, addShows } from '../../redux/movies/movieSlice';
import Login from '../signIn/Login';

const Header = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [modal, setModal] = useState(false)
  const { user } = useSelector(state => state.users)

  // useEffect(() => {

  // }, [user, input])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (input === "") return alert("Please Enter a valid search")

    // add in the movie state
    const movieData = await axios.get(`${baseURL}?apikey=${MovieApiKey}
        &s=${input}&type=movie`)
    dispatch(addMovies(movieData.data.Search))


    // add in shows state
    const showsData = await axios.get(`${baseURL}?apikey=${MovieApiKey}
      &s=${input}&type=series`)

    dispatch(addShows(showsData.data.Search))

  }

  const handleLogin = () => {
    setModal(true)
  }

  return (
    <>
      <header className='relative z-40 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md border-b border-gray-700/50 shadow-xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 py-4 md:py-6'>
          
          {/* Logo Section */}
          <div className='logo flex flex-row gap-3 items-center group cursor-pointer'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300'></div>
              <i className="ri-movie-2-fill text-white text-4xl md:text-5xl relative z-10 transform group-hover:scale-110 transition-transform duration-300"></i>
            </div>
            <Link to="/" className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300'>
              Movie App
            </Link>
          </div>

          {/* Search Section */}
          <div className='flex-1 max-w-lg w-full'>
            <form onSubmit={submitHandler} className='relative group'>
              <div className='relative bg-white/95 backdrop-blur-sm rounded-full shadow-lg ring-1 ring-gray-300/50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-xl transition-all duration-300'>
                <input 
                  className='w-full px-6 py-3 pr-14 rounded-full text-gray-800 placeholder-gray-400 outline-none border-none bg-transparent focus:placeholder-gray-300 transition-all duration-300'
                  type="text" 
                  value={input} 
                  placeholder='Search Movies or Shows...'
                  onChange={(e) => setInput(e.target.value)}
                />
                <button 
                  type='submit' 
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2'
                >
                  <i className='ri-search-line text-lg'></i>
                  <span className='hidden sm:inline'>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Actions Section */}
          <div className='text-white flex flex-row gap-4 md:gap-5 items-center'>
            {/* Favorite Button */}
            <button className="favorite flex flex-row gap-2 items-center px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group relative">
              <span className='text-base md:text-lg font-medium hidden sm:inline group-hover:text-red-400 transition-colors duration-300'>Favorite</span>
              <div className='relative'>
                <i className="ri-heart-3-fill text-2xl md:text-3xl text-red-500 group-hover:text-red-400 group-hover:scale-110 transform transition-all duration-300"></i>
              </div>
            </button>

            {/* Account Section */}
            <div className="account flex flex-row gap-2 items-center">
              {user?.name ? (
                <div className='flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer group'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300'>
                    {user.name.split(' ')[0][0].toUpperCase()}
                  </div>
                  <span className='text-base md:text-lg font-medium hidden md:inline'>{user.name.split(' ')[0]}</span>
                </div>
              ) : (
                <button 
                  onClick={handleLogin} 
                  className='flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200'
                >
                  <i className="ri-user-fill text-lg"></i>
                  <span className='text-base md:text-lg'>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      </header>
      {modal && <Login close={setModal} />}
    </>
  )
}

export default Header