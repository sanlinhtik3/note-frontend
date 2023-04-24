import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const registerUser = createAsyncThunk("user/register", async(userData, thunkAPI) => {
    try {
        return await authService.registerUser(userData)
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginUser = createAsyncThunk("user/login", async(userData, thunkAPI) => {
    try {
        return await authService.loginUser(userData)
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logoutUser = createAsyncThunk("user/logout", async(userData, thunkAPI) => {
    try {
        return await authService.logoutUser(userData)
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false,
            state.isLoading = false,
            state.isSuccess = false,
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.user = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isError = true
                state.message = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer