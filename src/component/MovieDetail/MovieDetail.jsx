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
                                    {addCard ? (<div
                                        className='bg-red-800 items-center hover:bg-red-500 items-center border-none 
                                    rounded-md text-md text-white px-4 py-2 hover:cursor-pointer'>Watch Now</div>) : (
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



