import axios from 'axios';
import { baseURL } from './MovieApi';
import { MovieApiKey } from './MovieApiKey';

const fetchMovieOrShowById = async (imdbID) => {
    const response = await axios.get(`${baseURL}?apikey=${MovieApiKey}&i=${imdbID}&Plot=full`)
    return response.data
}

export { fetchMovieOrShowById }