import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    favorite: [],
    cart: []
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
            const exists = state.cart.filter((item) => item.movieId === movieId)
            // if movie is not in the cart then only add
            if (exists.length == 0) {
                state.cart = [...state.cart, action.payload]
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.movieId !== action.payload)
        }
        ,
        clearCart: (state, action) => {
            state.cart = []
        }

    }
})

export const { addUser, deleteUser, addToFavorite, removeFromFavorite, addToCart, removeFromCart, clearCart } = userSlice.actions
export default userSlice.reducer