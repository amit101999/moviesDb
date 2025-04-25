import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from "../MovieCard/MovieCard"

const Movielisting = () => {

  const movies = useSelector((state) => state.movies.movies);
  const shows = useSelector((state) => state.movies.shows);




  return (
    <div className="w-full">
      <div className='py-4'>
        <p className='text-2xl text-white underline text-center mb-4 bg-gray-800'>Movies :</p>
        <div className=' grid grid-cols-4 gap-4'>{
          movies?.map((movie, key) => (
            <MovieCard key={key} data={movie} />
          ))
        }</div>
      </div>
      <div className=''>
        <p className='text-2xl text-white underline text-center mb-4 bg-gray-800'>Shows :</p>
        <div className='grid grid-cols-4 gap-4'>
          {
            shows?.map((shows, key) => (
              < MovieCard key={key} data={shows} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Movielisting