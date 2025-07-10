import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    author: '',
    onlyFavorite: false
}

const filterSlice = createSlice({
    name: "filter",
    initialState: initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            // или так
            // return {...state, title: action.payload}

            // или так
            // state = {
            //     title: action.payload
            // }
            // return state;

            // или так
            // В redux состояние изменять нельзя, а в redux slice это можно с помощью библиотеки immer (node-modules/immer)
            state.title = action.payload
        },
        setAuthorFilter: (state, action) => {
            state.author = action.payload
        },
        setOnlyFavoriteFilter: (state) => {
            state.onlyFavorite = !state.onlyFavorite
        },
        resetFilters: () => {
            return initialState;
        }
    }
})

export const { setTitleFilter, setAuthorFilter, setOnlyFavoriteFilter, resetFilters } = filterSlice.actions

export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorFilter = (state) => state.filter.author
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorite

export default filterSlice.reducer;