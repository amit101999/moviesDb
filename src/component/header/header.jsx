import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
// import { fetchAsyncMovies, fetchAsyncShows } from '../../redux/movies/movieSlice';
import "./header.css"
import axios from "axios"
import { baseURL } from "../Apis/MovieApi";
import { MovieApiKey } from '../Apis/MovieApiKey';
import { addMovies, addShows } from '../../redux/movies/movieSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

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
  return (
    <div className='flex justify-between p-4 py-8 border-b-2 border-b-gray-100' >

      <div className='logo flex flex-row gap-2 items-center '>
        <i class="ri-movie-2-fill text-white"></i>
        <Link to="/" className='text-4xl font-semibold text-white'>
          Movie App
        </Link>
      </div>

      <div className='w-[35%] rounded-md bg-white py-2 px-2'>
        <form onSubmit={submitHandler} className='w-full '>
          <input className='flex-grow border rounded-l py-2 outline-none border-none'
            type="text" value={input} placeholder='Search Movies or Shows'
            onChange={(e) => setInput(e.target.value)}></input>
          <button type='submit' className='bg-sky-600 text-white w-32 rounded-md' ><i className='fa fa-search'></i></button>
        </form>
      </div>


      <div className='text-white flex flex-row gap-3 items-center'>
        <div className="favorite flex flex-row gap-1 items-center">
          <span className='text-xl'>Favorite</span>
          <i class="ri-heart-3-fill text-3xl"></i>
        </div>
        <div className="account flex flex-row gap-1 items-center">
          <span className='text-xl'>Account</span>
          <i className="ri-map-pin-user-fill text-3xl"></i>
        </div>
      </div>
    </div >
  )
}

export default Header