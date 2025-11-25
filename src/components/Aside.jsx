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
     return (
    <aside className="w-60 min-h-screen bg-white border-r px-4 py-4 overflow-y-auto">
      <ul className="space-y-3 mb-4">
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer">
          <TiHomeOutline /> Home
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer">
          <SiYoutubeshorts /> Shorts
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer">
          <MdOutlineSubscriptions /> Subscriptions
        </li>
      </ul>

      <hr />

      <span className="block text-gray-500 font-semibold mt-3 mb-2">
        Explore
      </span>

      <ul className="space-y-3 mb-4">
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><RiShoppingBag4Line /> Shopping</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><IoMusicalNoteOutline /> Music</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><BiSolidMovie /> Movies</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><SiYoutubegaming /> Gaming</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><FaRegNewspaper /> News</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><FaTrophy /> Sports</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><PiCoatHanger /> Fashion & Beauty</li>
      </ul>

      <hr />

      <ul className="space-y-3 mt-4">
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><IoSettingsOutline /> Settings</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><FiFlag /> Report History</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><MdHelpOutline /> Help</li>
        <li className="flex gap-3 items-center hover:bg-gray-200 rounded-lg p-2 cursor-pointer"><MdOutlineFeedback /> Feedback</li>
      </ul>
    </aside>
  );

}