import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
// import dummyUsers from "./dummy.json"

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
    const res = await axios.get('http://localhost:4567/users')
    return res.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users: [],
        currentUser: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true,
                state.users = []
        }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

        // reducers: {
        //     signup: (state, action) => {
        //         const { username, email, password } = action.payload
        //         const newUser = {
        //             id: state.users.length + 1,
        //             username,
        //             email,
        //             password
        //         }
        //         state.users.push(newUser)
        //         state.error = null
        //     },
        //     login: (state, action) => {
        //         const { email, password } = action.payload
        //         const user = state.users.find(u => u.email === email && u.password === password)
        //         if (user) {
        //             state.currentUser = { id: user.id, username: user.username, email: user.email }
        //             localStorage.setItem("loggedInUser", JSON.stringify(state.currentUser))
        //             state.error = null
        //         } else {
        //             state.error = "Invalid credentials."
        //         }
        //     },
        //     logout: (state) => {
        //         state.currentUser = null
        //         localStorage.removeItem("loggedInUser")
        //     }
        // }

        // export const { signup, login, logout } = authSlice.actions
        export default authSlice.reducer
