import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import createBookWithId from "../../utils/createBookWithId";
import { setError } from "./errorSlice";

const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk(
    "books/fetchBook",
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setError(error.message))
            // или
            // throw error;
            // или
            return thunkAPI.rejectWithValue(error)
        }

    })

const booksSlice = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            // или так
            // const index = state.findIndex((book) => book.id == action.payload)
            // if (index !== -1) {
            //     state.splice(index, 1);
            // }
            // или так
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload)
            }
        },
        toggleFavorite: (state, action) => {
            // или так
            state.books.forEach((book) => {
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
    },

    // extraReducers: (builder) => {
    //     builder.addCase(fetchBook.fulfilled, (state, action) => {
    //         if (action.payload.title && action.payload.author) {
    //             state.books.push(createBookWithId(action.payload, "API"))
    //         }
    //     });
    // }

    // не работает
    // extraReducers: {
    //     [fetchBook.pending]: (state, action) => {
    //         state.isLoadingViaAPI = true
    //     },
    //     [fetchBook.fulfilled]: (state, action) => {
    //         state.isLoadingViaAPI = false
    //         if (action.payload.title && action.payload.author) {
    //             state.books.push(createBookWithId(action.payload, "API"))
    //         }
    //     },
    //     [fetchBook.rejected]: (state, action) => {
    //         state.isLoadingViaAPI = false

    //     }
    // }
     extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state, action) => {
                state.isLoadingViaAPI = true;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.isLoadingViaAPI = false;
                if (action.payload.title && action.payload.author) {
                    state.books.push(createBookWithId(action.payload, "API"));
                }
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.isLoadingViaAPI = false;
            });
    }
});

// export const thunkFunction = async (dispatch, getState) => {
//     try {
//         const res = await axios.get("http://localhost:4000/random-book");
//         console.log(res);
//         if (res?.data?.title && res?.data?.author) {
//             dispatch(addBook(createBookWithId(res.data, "API")));
//         }
//     } catch (error) {
//         console.log("Error fetching random book:", error);

//     }
// }

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books.books
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default booksSlice.reducer;