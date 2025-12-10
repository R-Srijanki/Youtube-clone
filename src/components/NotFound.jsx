import { useRouteError, Link } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";
import { useSelector } from "react-redux";
//react icon
export default function NotFound() {
  const err = useRouteError(); // for more details about error occurred
  // console.error(err); // helpful for debugging
  const loggedIn = useSelector((store) => store.User.loggedIn);
  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="flex items-center text-6xl sm:text-8xl font-extrabold mb-6 text-red-600 dark:text-red-400">
        <TbFaceIdError className="mr-3" /> OOPS!
      </h1>

      <div className="flex flex-col sm:flex-row items-center mb-4 text-center sm:text-left gap-1">
        <h2 className="text-3xl font-semibold sm:text-4xl text-gray-800 dark:text-gray-200 px-2">
          Error {err?.status || 404}:
        </h2>
        <h3 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 px-2 mt-1 sm:mt-0">
          Page Not Found
        </h3>
      </div>
      {!loggedIn ? (
        <p className="text-lg mb-6 text-yellow-700 dark:text-yellow-400 font-medium">
          You are not logged in.
        </p>
      ) : (
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 max-w-md px-4">
          {err?.message || "Something went wrong. Please try again later."}
        </p>
      )}
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        aria-label="Back to home page"
      >
        ← Back to Home Page
      </Link>
    </div>
  );
}
