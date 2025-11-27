import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import appStore from "./utils/store";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Video from './components/Video.jsx';
import Search from './components/Search.jsx';
const router=createBrowserRouter([
      {
        path:"/",
        element:<App/>,
        children:[
          {
            index:true,
            element:<Home/>
          },
          {
            path:"/video/:id",
            element:<Video/>
          },
          {
            path:"/:category",
            element:<Home/>
          },
          {
            path:"/search/:searchtext",
            element:<Search/>

          }
        ]
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={appStore}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
