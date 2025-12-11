import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingVideos from "./LoadingVideos";
export default function Search() {
  const visible = useSelector((store) => store.Sidebar.open);
  const { searchtext } = useParams();
  const [loading, setLoading] = useState(true);
  //get searchtext from url
  //store videos
  const [videos, setVideos] = useState([]);
  
  const filters = [
    "All",
    "Videos",
    "Shorts",
    "Recently uploaded",
    "Today",
    "This week",
    "This month",
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  //get videos from api
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await axios.get("http://localhost:8000/videos");
        //search based on title
        const searchrelated = res.data.filter(
          (item) =>
            (item.category || "")
              .toLowerCase()
              .includes(searchtext.toLowerCase()) ||
            item.title.toLowerCase().includes(searchtext.toLowerCase())
        );
        setVideos(searchrelated);
      } catch (err) {
        console.log("Error while fetching videos");
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, [searchtext]);
  if (loading) {
    return <LoadingVideos />;
  }
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 mb-6 border-b border-gray-200 dark:border-gray-800">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={
              "whitespace-nowrap px-4 py-1 rounded-full text-sm font-medium border transition-all duration-200 hover:shadow-md " +
              (activeFilter === f
                ? "bg-black text-white border-black shadow-sm dark:bg-primary dark:text-primary-dark dark:border-primary-dark"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 border-gray-300 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400")
            }
          >
            {f}
          </button>
        ))}
      </div>
      {/* No Results */}
      {videos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No videos found
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching for something else related to "{searchtext}"
          </p>
        </div>
      )}
      {/*videos */}
      <div
        className={
          !visible
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      >
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="block hover:scale-105 transition-transform cursor-pointer"
          >
            <VideoCard video={video} />
          </Link>
        ))}
      </div>
    </div>
  );
}
