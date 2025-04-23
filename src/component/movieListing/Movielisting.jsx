import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from "../MovieCard/MovieCard"
import axios from 'axios';
import { baseURL } from '../Apis/MovieApi';
import { MovieApiKey } from '../Apis/MovieApiKey';
import { addMovies } from '../../redux/movies/movieSlice';

const Movielisting = () => {

  const movies = useSelector((state) => state.movies.movies);
  const shows = useSelector((state) => state.movies.shows);



  let renderMovies, renderShows = "";
  // renderMovies = movies.Response === "True" ? (
  //   movies.Search.map((movie, index) => (
  //     <MovieCard key={index} data={movie} />

  //     ))) : (<div className='movies-error'><h3>{movies.error}</h3></div>);
  // console.log("rendermovies", renderMovies);
  // renderShows = shows.Response === "True" ? (
  //   shows.Search.map((shows, index) => (
  //     <MovieCard key={index} data={shows} />
  //   ))) : (<div className='shows-error'><h3>{shows.error}</h3></div>);
  // console.log("render showsrender", renderShows);


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