import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice(
    {
        name: "Sidebar",
        initialState: {
            open: false
        },
        reducers: {
            toggleSidebar: (state, action) => {
                state.open = !state.open;
            }
        }
    }
)

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;