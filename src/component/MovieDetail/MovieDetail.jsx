import React, { useEffect, useState } from 'react';
import { useParams } from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedMoviesorShow, removeselectedmovieorshow, } from '../../redux/movies/movieSlice';
import { addShowsCart, addToCart } from '../../redux/users/userSlice';
import axios from 'axios';
import { baseURL } from '../Apis/MovieApi'
import { MovieApiKey } from '../Apis/MovieApiKey';
// import { Razorpay } from 'razorpay'


const MovieDetail = () => {

    const [addCard, setAddCard] = useState(false)

    const dispatch = useDispatch();
    const { imdbID } = useParams();

    const data = useSelector((state) => state.movies.selectedmovieorshow)
    const cartData = useSelector((state) => state.users.movieCart)
    const showsData = useSelector((state) => state.users.showsCart)
    const { user } = useSelector(state => state.users)

    const checkout = async () => {
        const paymentKey = await axios.get("http://www.localhost:3500/getkey")

        const paymentOrder = await axios.post("http://localhost:3500/checkout", {
            amount: 400
        })

        const options = {
            key: paymentKey.data.key,
            amount: paymentOrder.data.order.amount,
            currency: "INR",
            name: "MOVIE DB",
            description: data.Title,
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: paymentOrder.data.order.id,
            callback_url: "http://localhost:3500/paymentverification",
            prefill: {
                name: user.name,
                email: user.email,
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();

    }

    const handleCart = async () => {

        // will process the payment interface
        await checkout()

        const Data = {
            Title: data.Title,
            price: 5,
            movieId: imdbID,
            poster: data.Poster
        }

        if (data.Type === 'movie') {
            dispatch(addToCart(Data))
        } else {
            dispatch(addShowsCart(Data))
        }
        alert('Conguraltions')
    }

    useEffect(() => {
        const isMovie = cartData?.find((item) => {
            return item.movieId === imdbID

        })
        const isShow = showsData?.find((item) => {
            return item.movieId === imdbID

        })


        if (isMovie || isShow) setAddCard(true)
        else setAddCard(false)

        return () => {
            setAddCard(false)
        }

    }, [cartData, showsData])

    useEffect(() => {
        const fetchMovieOrShowById = async (imdbID) => {
            const response = await axios.get(`${baseURL}?apikey=${MovieApiKey}&i=${imdbID}&Plot=full`)
            dispatch(addSelectedMoviesorShow(response.data))
        }

        fetchMovieOrShowById(imdbID);
        return () =>
            dispatch(removeselectedmovieorshow())
    }, [dispatch, imdbID]);



    return (
        <div className='min-h-screen py-8'>
            {Object.keys(data).length === 0 ? (
                <div className='flex items-center justify-center min-h-[60vh]'>
                    <div className='text-center'>
                        <div className='inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4'></div>
                        <h3 className='text-white text-2xl font-semibold'>Loading...</h3>
                    </div>
                </div>
            ) : (
                <>
                    {/* Main Content Section */}
                    <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 my-8'>
                        {/* Poster Section */}
                        <div className='w-full lg:w-[30%] flex-shrink-0'>
                            <div className='sticky top-8'>
                                <div className='relative group'>
                                    <div className='absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    <img 
                                        src={data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/400x600?text=No+Poster'} 
                                        alt={data.Title} 
                                        className='relative rounded-2xl w-full shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300'
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x600?text=No+Poster'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className='flex-1 space-y-8'>
                            {/* Title and Action Button */}
                            <div className='space-y-6'>
                                <div>
                                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4'>
                                        {data.Title}
                                    </h1>
                                    <div className='flex flex-wrap items-center gap-4 text-gray-300'>
                                        <span className='flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm'>
                                            <i className="ri-calendar-line text-blue-400"></i>
                                            {data.Year}
                                        </span>
                                        <span className='flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm'>
                                            <i className="ri-film-line text-purple-400"></i>
                                            {data.Runtime}
                                        </span>
                                        <span className='flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm'>
                                            <i className="ri-movie-2-line text-pink-400"></i>
                                            {data.Type === 'movie' ? 'Movie' : 'Series'}
                                        </span>
                                        {data.Rated && (
                                            <span className='px-3 py-1 bg-yellow-600/20 border border-yellow-500 rounded-full text-yellow-400 text-sm font-semibold'>
                                                {data.Rated}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className='flex justify-start'>
                                    {addCard ? (
                                        <button className='group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200'>
                                            <i className="ri-play-circle-fill text-2xl"></i>
                                            <span>Watch Now</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleCart}
                                            className='group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200'
                                        >
                                            <i className="ri-shopping-cart-2-fill text-2xl"></i>
                                            <span>Buy Now</span>
                                            <span className="ml-2 px-3 py-1 bg-white/20 rounded-lg text-xl font-bold">
                                                $5
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Ratings and Stats */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <div className='p-3 bg-yellow-500/20 rounded-lg'>
                                            <i className="ri-star-fill text-yellow-400 text-2xl"></i>
                                        </div>
                                        <div>
                                            <p className='text-gray-400 text-sm'>IMDB Rating</p>
                                            <p className='text-white text-2xl font-bold'>{data.imdbRating || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <p className='text-gray-500 text-sm mt-2'>{data.imdbVotes || 'N/A'} votes</p>
                                </div>

                                <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <div className='p-3 bg-blue-500/20 rounded-lg'>
                                            <i className="ri-thumb-up-fill text-blue-400 text-2xl"></i>
                                        </div>
                                        <div>
                                            <p className='text-gray-400 text-sm'>IMDB Votes</p>
                                            <p className='text-white text-2xl font-bold'>{data.imdbVotes || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Movie Information */}
                            <div className='space-y-6'>
                                <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                                    Movie Information
                                </h2>
                                
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
                                        <div className='flex items-start gap-3'>
                                            <i className="ri-movie-2-line text-blue-400 text-xl mt-1"></i>
                                            <div>
                                                <p className='text-gray-400 text-sm mb-1'>Director</p>
                                                <p className='text-white font-medium'>{data.Director || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
                                        <div className='flex items-start gap-3'>
                                            <i className="ri-star-line text-yellow-400 text-xl mt-1"></i>
                                            <div>
                                                <p className='text-gray-400 text-sm mb-1'>Actors</p>
                                                <p className='text-white font-medium line-clamp-2'>{data.Actors || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
                                        <div className='flex items-start gap-3'>
                                            <i className="ri-price-tag-3-line text-purple-400 text-xl mt-1"></i>
                                            <div>
                                                <p className='text-gray-400 text-sm mb-1'>Genres</p>
                                                <p className='text-white font-medium'>{data.Genre || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
                                        <div className='flex items-start gap-3'>
                                            <i className="ri-global-line text-green-400 text-xl mt-1"></i>
                                            <div>
                                                <p className='text-gray-400 text-sm mb-1'>Languages</p>
                                                <p className='text-white font-medium'>{data.Language || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {data.Awards && data.Awards !== 'N/A' && (
                                        <div className='bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/30 md:col-span-2'>
                                            <div className='flex items-start gap-3'>
                                                <i className="ri-award-line text-yellow-400 text-xl mt-1"></i>
                                                <div>
                                                    <p className='text-gray-400 text-sm mb-1'>Awards</p>
                                                    <p className='text-white font-medium'>{data.Awards}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Storyline Section */}
                            <div className='space-y-4 pt-4'>
                                <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                                    Storyline
                                </h2>
                                <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 md:p-8 border border-gray-700 shadow-lg'>
                                    <p className='text-gray-300 text-lg leading-relaxed text-justify'>
                                        {data.Plot || 'No plot available.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieDetail;



