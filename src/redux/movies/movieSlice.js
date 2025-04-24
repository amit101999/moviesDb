import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    shows: [],
    selectedmovieorshow: [],

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

    },

});

export const { removeselectedmovieorshow, addMovies, addShows, addSelectedMoviesorShow, } = movieSlice.actions;
export default movieSlice.reducer;