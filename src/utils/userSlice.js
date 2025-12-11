import { createSlice } from "@reduxjs/toolkit";
//to store user details after login and delete after logout
const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    loggedIn: false,
  },
  reducers: {
    toggleLogin: (state) => { //toggle login
      state.loggedIn = !state.loggedIn;
    },
    loginUser: (state, action) => { //adds details of user
      state.user = action.payload;
      state.loggedIn = true;
    },
    logoutUser: (state, action) => {//removes details of user 
      state.loggedIn = false;
      state.user = null;
    },
    updateUser: (state, action) => {//update user
      state.user = action.payload;
    },
  },
});

export const { loginUser, logoutUser, toggleLogin, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
