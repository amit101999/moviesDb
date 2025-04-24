
import movieReducer from "../redux/movies/movieSlice";
import userReducer from "../redux/users/userSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
  reducer: {
    movies: movieReducer,
    users: userReducer
  },

})

export default store