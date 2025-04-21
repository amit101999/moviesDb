import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchAsyncMovies, fetchAsyncShows } from '../../redux/movies/movieSlice';
import "./header.css"

const Header = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please Enter a valid search")
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");

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
            type="text" value={term} placeholder='Search Movies or Shows'
            onChange={(e) => setTerm(e.target.value)}></input>
          <button type='submit' className='bg-sky-600 text-white w-32 rounded-md' ><i className='fa fa-search'></i></button>
        </form>
      </div>

      {/* <div className="w-[40%] px-4 rounded-md">
        <form onSubmit={submitHandler} className=" w-full rounded-md shadow-md bg-white">
          <input
            className=" px-3 py-2 border-none outline-none"
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-sky-600 w-32 text-white px-4 py-2 hover:bg-sky-700"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div> */}


      <div className='text-white flex flex-row gap-1 items-center'>
        <span className='text-2xl'>Account</span>
        <i className="ri-map-pin-user-fill text-4xl"></i>
      </div>
    </div >
  )
}

export default Header