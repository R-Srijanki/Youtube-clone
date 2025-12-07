import { useRouteError, Link } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";
import { useSelector } from "react-redux";
//react icon
export default function NotFound() {
  const err = useRouteError(); // for more details about error occurred
 // console.error(err); // helpful for debugging
  const loggedIn=useSelector(store=>store.User.loggedIn);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl sm:text-8xl font-bold mb-5 flex"><TbFaceIdError/> OOPS!</h1>
     
      <div className="flex mb-2.5 break-normal"> 
        <h1 className="text-2xl font-bold sm:text-4xl px-2.5">Error {err?.status}:</h1>
        <h3 className="text-lg mt-1 sm:text-2xl sm:mt-1.5 px-2">Page Not Found</h3>
      </div>
      {!loggedIn?<p className="text-base mb-2.5 sm:text-xl">Not Logged In</p>:
      <p className="text-base mb-2.5 sm:text-xl">{err?.message || "Something went wrong."}</p>}
       <Link
      to="/"
      className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
    >
      ← Back to Home Page
    </Link>
    </div>
  );
}