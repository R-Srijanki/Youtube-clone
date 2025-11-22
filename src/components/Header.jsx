import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdVideoCameraFront } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/sidebarslice";
import { Link } from "react-router";

export default function Header(){
    const user=useSelector(store=>store.User.loggedIn);
    const dispatch=useDispatch();
    function handleclick(){
       dispatch(toggleSidebar());
    }
    return(
        <div>
            <header className="flex justify-between w-screen px-5 py-2.5">
                <div className="flex">
                    <button onClick={handleclick}><RxHamburgerMenu/></button>
                    <Link to="/">
                    <div className="flex ml-5">
                        <span className="text-red-500 mt-1 text-2xl"><FaYoutube/></span>
                        <p className="text-xl font-bold">YouTube</p>
                    </div>
                    </Link>
                </div>
                <div className="flex">
                    <div className="flex border rounded-xl w-[400px]">
                        <input type="text" placeholder="Search" className="outline-none w-[375px] px-2 py-1"/>
                        <span className="w-[25x] border-l flex items-center justify-center"><IoSearchOutline/></span>
                    </div>
                </div>
                {user?(<div className="flex justify-evenly">
                   <span className="text-2xl mx-5"><MdVideoCameraFront/></span>
                   <span className="text-2xl mx-2.5"><IoIosNotificationsOutline/></span>
                   <span className="text-2xl mx-2.5"><CgProfile/></span>
                </div>):(
                    <Link to="/login">
                    <div className="border rounded-2xl flex px-2 py-0.5">
                        <span className="mt-0.5 px-0.5 text-2xl"><CgProfile/></span>
                        <span className="font-semibold">Sign in</span>
                    </div>
                    </Link>
                )}
            </header>
        </div>
    )
}