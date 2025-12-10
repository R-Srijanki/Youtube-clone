import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function VideoSection({ category, currentVideoId }) {
  const [videos, setVideos] = useState([]);
  //get videos details by api call
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await axios.get("http://localhost:8000/videos");
        setVideos(res.data);
      } catch (err) {
        console.log("Error while fetching videos", err);
      }
    }
    loadVideos();
  }, []);
  //filter videos based current playing video
  const filteredVideos = useMemo(() => {
    // Remove the current video from suggestions
    const others = videos.filter((v) => v._id !== currentVideoId);

    // If category not specified, show generic suggestions
    if (!category || category === "All") {
      return others.slice(0, 10);
    }

    // Filter by category
    const fv = others.filter((v) => v.category === category);

    // If no videos in same category, fall back to popular videos
    if (fv.length === 0) {
      return others.slice(0, 10);
    }

    return fv;
  }, [videos, category, currentVideoId]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-3">Related Videos</h3>
      {filteredVideos.map((item) => (
        <Link
          key={item._id}
          to={`/video/${item._id}`}
          className="flex gap-3 hover:bg-gray-100 dark:hover:bg-primary-dark/30 p-2 rounded-lg transition-all cursor-pointer"
        >
          {/**thumbnail url */}
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-40 h-24 object-cover rounded-md"
          />
          {/**title */}
          <div className="flex flex-col justify-between">
            <p className="font-medium text-black dark:text-primary line-clamp-2">
              {item.title}
            </p>
            {/**channel name,views upload date */}
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.channel?.name}
            </p>

            <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-1">
              <span>{item.views} views</span>
              <span>•</span>
              <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
