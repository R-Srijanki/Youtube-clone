import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdVideoCameraFront } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { GrChannel } from "react-icons/gr";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { SiYoutubestudio } from "react-icons/si";
import { BiDollarCircle } from "react-icons/bi";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";

import { useSelector,useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/sidebarslice";
import { Link, useNavigate } from "react-router";
import { useRef,useEffect, useState } from "react";
import { toggleTheme } from "../utils/modeSlice";
import { logoutUser } from "../utils/userSlice";

export default function Header(){
    const loggedIn=useSelector(store=>store.User.loggedIn);
    const user=useSelector(store=>store.User.user);
    const themeMode = useSelector((store) => store.Theme.mode);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [search,setSearch]=useState("");
    const [menuOpen,setMenuOpen]=useState(false);
    const [channelMenuOpen,setChannelMenuOpen]=useState(false);
   
    const avatar = user?.avatar || "https://ui-avatars.com/api/?name=User&background=random";
    const profileRef = useRef();
    const uploadRef = useRef();

    // Close menus on outside click
    useEffect(() => {
      function handleClickOutside(event) {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
        if (uploadRef.current && !uploadRef.current.contains(event.target)) {
          setChannelMenuOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        if (themeMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
    }, [themeMode]);
    const handletoggle = () => {
      console.log("toggle");
        dispatch(toggleTheme());
    };
    const handlelogout=()=>{
      localStorage.clear();
      navigate('/');
      dispatch(logoutUser());
    };
    return (
    <header className="flex justify-between items-center w-full px-4 py-2 shadow-md bg-white dark:bg-gray-900 sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <RxHamburgerMenu size={22} />
        </button>

        <Link to="/" className="flex items-center gap-1">
          <FaYoutube className="text-red-600 text-3xl" />
          <p className="text-2xl font-bold dark:text-white">YouTube</p>
        </Link>
      </div>

      {/* Search bar */}
      <div className="flex items-center w-[450px] max-sm:w-[250px]">
        <div className="flex border rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 w-full">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none px-4 py-2 dark:text-white"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
           <Link
            className="px-4 border-l bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center"
            to={`/search/${search}`}
          >
            <IoSearchOutline size={22} />
          </Link>
        </div>
      </div>

      {/* Right section */}
      {loggedIn ? (
        <div className="flex items-center gap-6 relative">
          {/* CHANNEL SUBMENU */}
          <div className="relative" ref={uploadRef}>
            <MdVideoCameraFront
              onClick={() => setChannelMenuOpen(!channelMenuOpen)}
              className="text-2xl cursor-pointer dark:text-white"
            />
            {channelMenuOpen && (
              <ul className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2">
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <Link to="/channel/upload" className="flex items-center gap-2"><GoVideo /> Upload Video</Link>
                </li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <Link to="/channel" className="flex items-center gap-2"><GrChannel /> View Channel</Link>
                </li>
              </ul>
            )}
          </div>
          <IoIosNotificationsOutline className="text-2xl cursor-pointer dark:text-white"/>
          <div className="relative" ref={profileRef}>
            <img
              src={avatar}
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full object-cover border cursor-pointer"
            />

            {/* USER DROPDOWN */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3">
                {/* USER BLOCK */}
                <div className="flex items-center gap-3 p-3">
                  <img src={avatar} className="w-10 h-10 rounded-full border" />
                  <div className="flex flex-col dark:text-white">
                    <span className="font-semibold">{user?.username}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {user?.channel?.handle || "No channel"}
                    </span>
                  </div>
                </div>

                <hr className="my-2" />

                {/* Account Options */}
                <ul className="text-sm dark:text-white">
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><FaGoogle /> Google Account</li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><MdOutlineSwitchAccount /> Switch Account</li>
                  <li onClick={handlelogout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><PiSignOut /> Sign Out</li>
                </ul>

                <hr className="my-2" />

                <ul className="text-sm dark:text-white">
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><SiYoutubestudio /> YouTube Studio</li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><BiDollarCircle /> Purchases & memberships</li>
                </ul>

                <hr className="my-2" />

                {/* DARK MODE TOGGLE */}
                <ul className="text-sm dark:text-white">
                  <li onClick={handletoggle} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded">
                    {themeMode!='dark' ? <FaSun /> : <FaRegMoon />}
                    {themeMode!='dark' ? "Light Mode" : "Dark Mode"}
                  </li>

                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><IoLanguage /> Display Language</li>
                </ul>

                <hr className="my-2" />

                <ul className="text-sm dark:text-white">
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><CiSettings /> Settings</li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><IoMdHelpCircleOutline /> Help</li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"><RiFeedbackLine /> Send Feedback</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link to="/login">
          <div className="border rounded-full flex items-center px-2 py-1 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <CgProfile className="text-xl dark:text-white" />
            <span className="font-semibold dark:text-white">Sign In</span>
          </div>
        </Link>
      )}
    </header>
  );
}