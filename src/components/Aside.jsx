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
import { Link } from "react-router-dom";;
export default function Aside() {
  return (
    //side bar to open when click on hamburger in header (only home works)
    <aside
      className="w-60 absolute z-40 md:static min-h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700 px-4 py-4 overflow-y-auto">
      <ul className="space-y-3 mb-4">
        <Link
          to="/"
          className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <TiHomeOutline /> Home
        </Link>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <SiYoutubeshorts /> Shorts
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <MdOutlineSubscriptions /> Subscriptions
        </li>
      </ul>

      <hr className="border-gray-300 dark:border-gray-700" />

      <span className="block text-gray-500 dark:text-gray-400 font-semibold mt-3 mb-2">
        Explore
      </span>

      <ul className="space-y-3 mb-4 text-gray-900 dark:text-gray-100">
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <RiShoppingBag4Line /> Shopping
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <IoMusicalNoteOutline /> Music
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <BiSolidMovie /> Movies
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <SiYoutubegaming /> Gaming
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <FaRegNewspaper /> News
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <FaTrophy /> Sports
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <PiCoatHanger /> Fashion & Beauty
        </li>
      </ul>

      <hr className="border-gray-300 dark:border-gray-700" />

      <ul className="space-y-3 mt-4 text-gray-900 dark:text-gray-100">
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <IoSettingsOutline /> Settings
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <FiFlag /> Report History
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <MdHelpOutline /> Help
        </li>
        <li className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <MdOutlineFeedback /> Feedback
        </li>
      </ul>
    </aside>
  );
}
