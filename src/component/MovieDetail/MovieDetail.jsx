import React, { useEffect } from 'react';
import { useParams } from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedMoviesorShow, removeselectedmovieorshow, } from '../../redux/movies/movieSlice';
import { addToFavorite, addToCart } from '../../redux/users/userSlice';
// import { fetchMovieOrShowById } from '../Apis/fetchMovies';

import axios from 'axios';
import { baseURL } from '../Apis/MovieApi'
import { MovieApiKey } from '../Apis/MovieApiKey';


const MovieDetail = () => {


    const dispatch = useDispatch();
    const { imdbID } = useParams();

    const data = useSelector((state) => state.movies.selectedmovieorshow)
    const cartData = useSelector((state) => state.users.cart)
    console.log(cartData[0]?.movieId)

    const handleCart = () => {
        const movieData = {
            Title: data.Title,
            price: 5,
            movieId: imdbID,
            poster: data.Poster
        }

        dispatch(addToCart(movieData))
    }

    useEffect(() => {
        console.log('sa')
        const fetchMovieOrShowById = async (imdbID) => {
            const response = await axios.get(`${baseURL}?apikey=${MovieApiKey}&i=${imdbID}&Plot=full`)
            dispatch(addSelectedMoviesorShow(response.data))
        }

        fetchMovieOrShowById(imdbID);
        return () =>
            dispatch(removeselectedmovieorshow())
    }, [dispatch, imdbID]);



    return (
        <div className='' >
            hello
            {Object.keys(data).length === 0 ? (<div><h3>...Loading</h3></div>) :
                (<>
                    <div className='flex flex-row my-6 w-full' >
                        <div className='w-[25%]'>
                            <img src={data.Poster} alt={data.Title} className='rounded-lg mt-20 h-100 w-full' />
                        </div>
                        <div className='ml-8 w-[70%]'>
                            <div className='text-white text-6xl'>{data.Title}</div>
                            <div className='flex flex-row justify-between mt-12'>
                                <div className='flex flex-col gap-3 text-start mt-4 text-md text-white'>
                                    <span className='flex flex-row gap-2 items-center'>IMDB Rating : <i class="fa-solid fa-star"></i>{data.imdbRating}</span>
                                    <span className='flex flex-row gap-2 items-center'>IMDB Votes <i class="fa-solid fa-thumbs-up"></i>:{data.imdbVotes} </span>
                                    <span className='flex flex-row gap-2 items-center' >RunTime <i class="fa-solid fa-film"></i>:{data.Runtime}</span>
                                    <span className='flex flex-row gap-2 items-center'>Year <i class="fa-solid fa-calendar"></i>:{data.Year}</span>
                                </div>
                                <div className='favorite '>
                                    {cartData.includes(imdbID) ? (<div>Watch Now</div>) : (
                                        <button
                                            className='bg-sky-500 items-center hover:bg-sky-400 items-center border-none 
                                     rounded-md text-md text-white px-4 py-2'
                                            onClick={handleCart}>Buy Now :
                                            <span className="text-xl ml-2">$5</span>
                                        </button>)}
                                </div>
                            </div>
                            <div className=' text-white text-start mt-8 text-2xl' >Cast :</div>
                            <div className='flex flex-col gap-2 text-start mt-2'>
                                <p className='text-white' >Director : {data.Director}</p>
                                <p className='text-white' >Star : {data.Actors}</p>
                                <p className='text-white' >Genres : {data.Genre}</p>
                                <p className='text-white' >Languages : {data.Language}</p>
                                <p className='text-white' >Award : {data.Awards}</p>
                            </div>
                        </div>
                    </div>

                    <div className='my-12'>
                        <p className='bg-slate-800 text-white text-2xl py-1 my-4'>Storyline</p>
                        <div className='text-lg text-zinc-300 text-justify'>{data.Plot}</div>
                    </div>
                </>)
            }
        </div >
    );
};

export default MovieDetail;



