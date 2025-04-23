import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    shows: [],
    selectedmovieorshow: [],
    favorite: []

}
const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

        removeselectedmovieorshow: (state) => {
            state.selectedmovieorshow = {}
        },
        addMovies: (state, action) => {
            state.movies = action.payload
        }
        ,
        addShows: (state, action) => {
            state.shows = action.payload
        },
        addSelectedMoviesorShow: (state, action) => {
            state.selectedmovieorshow = action.payload
        },
        addToFavorite: (state, action) => {
            state.favorite = [...state.favorite, action.payload]
        },
        removeFromFavorite: (state, action) => {
            state.favorite = state.favorite.filter((item) => item.imdbID !== action.payload);
        }
    },

});

export const { removeselectedmovieorshow, addMovies, addShows, addSelectedMoviesorShow, addToFavorite, removeFromFavorite } = movieSlice.actions;
export default movieSlice.reducer;