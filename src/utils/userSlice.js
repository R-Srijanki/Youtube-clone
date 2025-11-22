import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: "User",
        initialState: {
            user: null,
            loggedIn: false
        },
        reducers: {
            toggelLogin: (state, action) => { state.loggedIn = !state.loggedIn },
            loginUser: (state, action) => {
                state.user = action.payload;
                state.loggedIn= true;
            },
            logoutUser: (state, action) => { 
                state.loggedIn=false;
                state.user=null;
            }
        }
    }
)

export const { loginUser, logoutUser, toggelLogin } = userSlice.actions;

export default userSlice.reducer;