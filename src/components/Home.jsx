import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingVideos from "./LoadingVideos";

export default function Home() {
  const visible=useSelector(store=>store.Sidebar.open);
  const [videos, setVideos] = useState([]);
  const [loading,setLoading]=useState(true);
  //to store videos 
  const {category}=useParams();
  //to get category if present from url
  //to get all types of category in videos
  const [catMap, setCatMap] = useState({});
  //to get videos from api
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await axios.get("http://localhost:8000/videos");
        //groups videos by category
       const grouped = res.data.reduce((acc, item) => {
          const cat = item.category || "General";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {});


       setCatMap(grouped);
        setVideos(res.data)
      } catch (err) {
        console.log("Error while fetching videos");
      }
      finally{
        setLoading(false);
      }
    }
    loadVideos();
  }, []);
  //filter if category present
   const filteredVideos = useMemo(() => {
    if (!category || category === "All") return videos;
    return catMap[category] || [];
  }, [videos, catMap, category]);

  // list of categories, including "All" at start
  const categories = useMemo(() => {
    const keys = Object.keys(catMap);
    const unique = ["All", ...keys];
    return unique;
  }, [catMap]);
  if(loading){
    return (<LoadingVideos/>)
  }
  return (
    <div className="p-4 text-black dark:text-primary">
      <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>

      {/* Category Filters */}
       <ul className="flex gap-3 overflow-x-auto no-scrollbar mb-4 pb-1 pt-1">
        {categories.map((cat) => {
          const isActive =
            (!category && cat === "All") || category === cat;

          const to =
            cat === "All" ? "/" : `/${encodeURIComponent(cat)}`;

          return (
            <li key={cat} className="">
              <Link
                to={to}
                className={
                  "border rounded-full px-4 py-1 text-sm whitespace-nowrap cursor-pointer " +
                  (isActive
                    ? "bg-black text-white border-black dark:bg-primary dark:text-primary-dark dark:border-primary-dark"
                    : "bg-gray-100 dark:bg-primary-dark/40 hover:bg-gray-200 dark:hover:bg-primary-dark/60")
                }
              >
                {cat}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Video Grid */}
      <div className={!visible?"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6":"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
        {filteredVideos.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="block hover:scale-105 transition-transform"
          >
            <VideoCard video={video}/>
          </Link>
        ))}
      </div>
    </div>
  );
}