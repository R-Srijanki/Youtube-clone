 import { createSlice } from '@reduxjs/toolkit';
  //handle mode
const initialState = {
    mode: localStorage.getItem('theme') || 'light', // Load from localStorage or default to 'light'
};

const themeSlice=createSlice({
    name:'Theme',
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            state.mode=state.mode==='light'?'dark':'light';
            localStorage.setItem('theme',state.mode);
        },
    },
});

export const {toggleTheme}=themeSlice.actions;
export default themeSlice.reducer;