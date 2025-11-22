import {useSelector} from "react-redux";
import { TiHomeOutline } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { BiSolidMovie } from "react-icons/bi";
import { SiYoutubegaming } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { PiCoatHanger } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiFlag } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { MdOutlineFeedback } from "react-icons/md";
export default function Aside(){
    const visible=useSelector(store=>store.Sidebar.open);
    return(
        <>
         {
            visible && (
        <aside className="w-1/5 h-screen bg-gray-100 p-4">
        <ul className="flex flex-col gap-3">
        <li className="flex"><span className="mt-1"><TiHomeOutline/></span>Home</li>
        <li className="flex"><span className="mt-1"><SiYoutubeshorts/></span>Shorts</li>
        <li className="flex"><span className="mt-1"><MdOutlineSubscriptions/></span>Subscriptions</li>
      </ul>
      <hr/>
      <span>Explore</span>
      <ul className="flex flex-col gap-3">
          <li className="flex"><span className="mt-1"><RiShoppingBag4Line /></span>Shopping</li>
          <li className="flex"><span className="mt-1"><IoMusicalNoteOutline/></span>Music</li>
          <li className="flex"><span className="mt-1"><BiSolidMovie /></span>Movies</li>
          <li className="flex"><span className="mt-1"><SiYoutubegaming/></span>Gaming</li>
          <li className="flex"><span className="mt-1"><FaRegNewspaper/></span>News</li>
          <li className="flex"><span className="mt-1"><FaTrophy/></span>Sports</li>
          <li className="flex"><span className="mt-1"></span>Courses</li>
          <li className="flex"><span className="mt-1"><PiCoatHanger/></span>Fashion & Beauty</li>
      </ul>
      <hr/>
      <ul className="flex flex-col gap-3">
        <li className="flex"><span className="mt-1"><IoSettingsOutline/></span>Settings</li>
        <li className="flex"><span className="mt-1"><FiFlag/></span>Report History</li>
        <li className="flex"><span className="mt-1"><MdHelpOutline/></span>Help</li>
        <li className="flex"><span className="mt-1"><MdOutlineFeedback/></span>Send Feedback</li>
      </ul>
    </aside>)
            }
            
        </>
    )
}