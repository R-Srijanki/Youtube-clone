// import { useContext } from "react";
// import asidecontext from "../Context/useContext";
import {useSelector} from "react-redux";
export default function Aside(){
    const visible=useSelector(store=>store.Sidebar.open);
    // const {visible}=useContext(asidecontext);
    return(
        <>
         {
                visible && (
    <aside className="w-1/5 h-screen bg-gray-100 p-4">
      <ul className="flex flex-col gap-3">
        <li>Home</li>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>
      <hr/>
      <span>Explore</span>
      <ul className="flex flex-col gap-3">
          <li>Music</li>
          <li>Movies</li>
          <li>Gaming</li>
          <li>News</li>
          <li>Sports</li>
          <li>Courses</li>
          <li>Fashion & Beauty</li>
      </ul>
      <hr/>
      <ul>
        <li>Settings</li>
        <li>Report History</li>
        <li>Help</li>
        <li>Send Feedback</li>
      </ul>
    </aside>)
            }
            
        </>
    )
}