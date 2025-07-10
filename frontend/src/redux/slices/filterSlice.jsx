import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: ''
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
        resetFilters: (state) => {
            return initialState;
        }
    }
})

export const { setTitleFilter, resetFilters } = filterSlice.actions

export const selectTitleFilter = (state) => state.filter.title

export default filterSlice.reducer;