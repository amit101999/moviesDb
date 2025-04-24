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
        }
    }
})

export const { addUser, deleteUser, addToFavorite, removeFromFavorite } = userSlice.actions
export default userSlice.reducer