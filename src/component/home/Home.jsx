import { useEffect } from 'react'
import MovieListing from "../movieListing/Movielisting";
import { useDispatch } from 'react-redux';
import { addMovies, addShows, } from '../../redux/movies/movieSlice';
import axios from 'axios';
import { baseURL } from '../Apis/MovieApi';
import { MovieApiKey } from '../Apis/MovieApiKey';

const Home = () => {

  const dispatch = useDispatch()
  const movieText = "harry",
    showText = "friend";
  useEffect(() => {

    const fetch = async () => {
      // add in the movie state
      const movieData = await axios.get(`${baseURL}?apikey=${MovieApiKey}
      &s=${movieText}&type=movie`)
      dispatch(addMovies(movieData.data.Search))

      // console.log(movieData.data.Search)

      // add in shows state
      const showsData = await axios.get(`${baseURL}?apikey=${MovieApiKey}
    &s=${showText}&type=series`)

      dispatch(addShows(showsData.data.Search))
    }

    fetch()

  }, [dispatch]);

  return (
    <div>
      <div className='banner-img'></div>
      <MovieListing />
    </div>
  )
}

export default Home