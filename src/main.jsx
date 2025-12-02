import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import appStore from "./utils/store";
import { lazy,Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const Home = lazy(() => import('./components/Home.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const Register = lazy(() => import('./components/Register.jsx'));
const Video = lazy(() => import('./components/Video.jsx'));
const Search = lazy(() => import('./components/Search.jsx'));
const Channel = lazy(() => import('./components/channel.jsx'));
const ChannelVideo = lazy(() => import('./components/ChannelVideo.jsx'));
const ManageVideos = lazy(() => import('./components/ManageVideos.jsx'))

const LazyWrapper = (Component) => (
  <Suspense fallback={<div className="text-center py-10 text-gray-600">Loading...</div>}>
    <Component />
  </Suspense>
)
const router=createBrowserRouter([
      {
        path:"/",
        element:<App/>,
        children:[
          {
            index:true,
            element:LazyWrapper(Home)
          },
          {
            path:"/video/:id",
            element:LazyWrapper(Video)
          },
          {
            path:"/:category",
            element:LazyWrapper(Home)
          },
          {
            path:"/search/:searchtext",
            element:LazyWrapper(Search)
          },
          {
            path:"/channel",
            element:LazyWrapper(Channel)
          },
          {
            path:"/channel/upload",
            element:LazyWrapper(ChannelVideo)
          },
          {
            path:"/managevideos",
            element:LazyWrapper(ManageVideos)
          },
          {
            path:"/login",
            element:LazyWrapper(Login)
          },
          {
            path:"/register",
            element:LazyWrapper(Register)
          }
        ]
      },
      
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={appStore}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
