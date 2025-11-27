import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdVideoCameraFront } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector,useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/sidebarslice";
import { Link } from "react-router";
import { useState } from "react";

export default function Header(){
    const loggedIn=useSelector(store=>store.User.loggedIn);
    const dispatch=useDispatch();
    const [search,setSearch]=useState("");

   return (
    <header className="flex justify-between items-center w-full px-4 py-2 shadow-md bg-white sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded hover:bg-gray-200"
        >
          <RxHamburgerMenu size={22} />
        </button>

        <Link to="/" className="flex items-center gap-1">
          <FaYoutube className="text-red-600 text-3xl" />
          <p className="text-2xl font-bold">YouTube</p>
        </Link>
      </div>

      {/* Search bar */}
      <div className="flex items-center">
        <div className="flex border rounded-full w-[450px] overflow-hidden bg-gray-100">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none px-4 py-2"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button className="px-4 border-l bg-gray-200 hover:bg-gray-300">
            <Link to={`/search/${search}`}><IoSearchOutline size={22} /></Link>
          </button>
        </div>
      </div>

      {/* Right section */}
      {loggedIn ? (
        <div className="flex items-center gap-6">
          <MdVideoCameraFront className="text-2xl" />
          <IoIosNotificationsOutline className="text-2xl" />
          <CgProfile className="text-2xl" />
        </div>
      ) : (
        <Link to="/login">
          <div className="border rounded-full flex items-center px-2 py-1 gap-2 hover:bg-gray-100">
            <CgProfile className="text-xl" />
            <span className="font-semibold">Sign In</span>
          </div>
        </Link>
      )}
    </header>
  );
}