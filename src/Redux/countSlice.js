import { createSlice } from "@reduxjs/toolkit";

export const countSlice = createSlice({
    name: 'count',
    initialState: {
        value: 0
    },
    reducers: {
        Increament: (state) => {
            state.value += 1
        },
        Descreament: (state) => {
            if (state.value >= 1) {
                state.value -= 1
            }

        }
    }
})

export const { Increament, Descreament } = countSlice.actions
export default countSlice.reducer