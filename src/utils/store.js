import {configureStore} from "@reduxjs/toolkit";
import sidebarsliceReducer from "./sidebarslice";
import userSliceReducer from "./userSlice";
import themeSliceReducer from "./themeslice"
const appStore=configureStore({
     reducer: {
          User:userSliceReducer,
          Sidebar:sidebarsliceReducer,
          Theme:themeSliceReducer
        }
});
export default appStore;