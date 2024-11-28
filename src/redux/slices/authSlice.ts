import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IInitialState } from "../../types";

const initialState: IInitialState = {
       token: localStorage.getItem("token") || null
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
        },
        signOut: (state) => {
            state.token = null
            localStorage.removeItem("token")
        }
    }
})

export const { loginUser, signOut } = authReducer.actions;
export default authReducer.reducer