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

  useEffect(() => {
    console.log("user is : ", user)
  }, [user, input])

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
    <div className=' flex justify-between p-4 py-8 border-b-2 border-b-gray-100' >

      <div className='logo flex flex-row gap-2 items-center '>
        <i class="ri-movie-2-fill text-white"></i>
        <Link to="/" className='text-4xl font-semibold text-white'>
          Movie App
        </Link>
      </div>

      <div className='px-2 rounded-md bg-white'>
        <form onSubmit={submitHandler} className='w-full'>
          <input className='flex-grow border rounded-l text-xl py-2 outline-none border-none'
            type="text" value={input} placeholder='Search Movies or Shows'
            onChange={(e) => setInput(e.target.value)}></input>
          <button type='submit' className='bg-sky-600 h-8 text-white w-20 rounded-md' ><i className='fa fa-search'></i></button>
        </form>
      </div>


      <div className='text-white flex flex-row gap-3 items-center'>
        <div className="favorite flex flex-row gap-1 items-center">
          <span className='text-xl'>Favorite</span>
          <i class="ri-heart-3-fill text-3xl"></i>
        </div>
        <div className="account flex flex-row gap-2 items-center">
          {user?.name ? (<>
            <span >{user.name.split(' ')[0].toUpperCase()}</span>
          </>) : (
            <button onClick={handleLogin} className='bg-gray-900'><span className='text-xl'>SingIn</span>
              <i className="ri-map-pin-user-fill text-xl"></i>
            </button>
          )}
        </div>
      </div >
      {modal && <Login close={setModal} />}
    </div >
  )
}

export default Header