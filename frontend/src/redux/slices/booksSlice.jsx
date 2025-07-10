import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import createBookWithId from "../../utils/createBookWithId";

const initialState = [];

const booksSlice = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload)
        },
        deleteBook: (state, action) => {
            // или так
            // const index = state.findIndex((book) => book.id == action.payload)
            // if (index !== -1) {
            //     state.splice(index, 1);
            // }
            // или так
            return state.filter((book) => book.id !== action.payload)
        },
        toggleFavorite: (state, action) => {
            // или так
            state.forEach((book) => {
                if (book.id == action.payload) {
                    book.isFavorite = !book.isFavorite
                }
            })
            // или так
            // return state.map((book) =>
            //     book.id === action.payload
            //         ? { ...book, isFavorite: !book.isFavorite }
            //         : book
            // )
        }
    }
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const thunkFunction = async (dispatch, getState) => {
    try {
        const res = await axios.get("http://localhost:4000/random-book")
        console.log(res)
        if (res?.data?.title && res?.data?.author) {
            dispatch(addBook(createBookWithId(res.data, "API")))
        }
    } catch (error) {
        console.log("Error fetching random book:", error);

    }
}

export const selectBooks = (state) => state.books

export default booksSlice.reducer;