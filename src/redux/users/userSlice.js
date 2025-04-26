import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    favorite: [],
    movieCart: [],
    showsCart: []
}

const userSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        deleteUser: (state, action) => {
            state.user = {}
        }
        ,
        addToFavorite: (state, action) => {
            state.favorite = [...state.favorite, action.payload]
        },
        removeFromFavorite: (state, action) => {
            state.favorite = state.favorite.filter((item) => item.imdbID !== action.payload);
        },
        addToCart: (state, action) => {
            const { movieId } = action.payload
            const exists = state.movieCart.filter((item) => item.movieId === movieId)
            // if movie is not in the movieCart then only add
            if (exists.length == 0) {
                state.movieCart = [...state.movieCart, action.payload]
            }
        },
        removeFromCart: (state, action) => {
            state.movieCart = state.movieCart.filter((item) => item.movieId !== action.payload)
        }
        ,
        addShowsCart: (state, action) => {
            const { movieId } = action.payload
            const exists = state.showsCart.filter((item) => item.movieId === movieId)
            // if movie is not in the movieCart then only add
            if (exists.length == 0) {
                state.showsCart = [...state.showsCart, action.payload]
            }
        },
        removeShowsFromCart: (state, action) => {
            state.showsCart = state.showsCart.filter((item) => item.movieId !== action.payload)
        }


    }
})

export const { addUser, deleteUser, addToFavorite, removeFromFavorite,
    addToCart, removeFromCart, clearCart,
    addShowsCart, removeShowsFromCart } = userSlice.actions
export default userSlice.reducer