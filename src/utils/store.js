import {configureStore} from "@reduxjs/toolkit";
import sidebarsliceReducer from "./sidebarslice";
import userSliceReducer from "./userSlice";
const appStore=configureStore({
     reducer: {
          User:userSliceReducer,
          Sidebar:sidebarsliceReducer
        }
});
export default appStore;