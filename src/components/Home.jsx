import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import VideoCard from "./VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const {category}=useParams();
  const [catMap, setCatMap] = useState({});
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("http://localhost:8000/videos");
        const json = await res.json();

       const grouped = json.reduce((acc, item) => {
          const cat = item.category || "General";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {});


       setCatMap(grouped);
        setVideos(json)
      } catch (err) {
        console.log("Error while fetching videos");
      }
    }
    loadVideos();
  }, []);
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
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>

      {/* Category Filters */}
       <ul className="flex gap-3 overflow-x-auto mb-4 pb-1">
        {categories.map((cat) => {
          const isActive =
            (!category && cat === "All") || category === cat;

          const to =
            cat === "All" ? "/" : `/${encodeURIComponent(cat)}`;

          return (
            <li key={cat}>
              <Link
                to={to}
                className={
                  "border rounded-full px-4 py-1 text-sm whitespace-nowrap cursor-pointer " +
                  (isActive
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 hover:bg-gray-200")
                }
              >
                {cat}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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