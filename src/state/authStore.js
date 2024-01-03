import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: "facu",
    token: null,
    window: 'request'
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin: (state,action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state,action) => {
            state.user = null
            state.token = null
        },
        setWindow: (state,action) => {
            state.window = action.payload.window
        }
    }
})

export const {setMode,setLogin,setLogout,setWindow} = authSlice.actions

export default authSlice.reducer