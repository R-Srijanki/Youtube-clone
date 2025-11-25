import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("http://localhost:8000/videos");
        const json = await res.json();
        setVideos(json);
      } catch (err) {
        console.log("Error while fetching videos");
      }
    }
    loadVideos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>

      {/* Category Filters */}
      <ul className="flex gap-4 overflow-x-auto mb-4">
        {["All", "Music", "Movies", "Cartoons", "Drama", "News", "Adventure"].map(
          (cat) => (
            <li
              key={cat}
              className="border rounded-lg px-3 py-1 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100"
            >
              {cat}
            </li>
          )
        )}
      </ul>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/videos/${video._id}`}
            className="block hover:scale-105 transition-transform"
          >
            <div className="rounded-lg overflow-hidden shadow-sm bg-white">
              
              {/* Thumbnail */}
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-40 object-cover"
              />

              {/* Video Info */}
              <div className="p-3 flex gap-3">
                {/* Channel Avatar */}
                <img
                  src={video.channel?.avatar}
                  alt={video.channel?.name}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-sm line-clamp-2">{video.title}</p>
                  <p className="text-xs text-gray-600">{video.channel?.name}</p>

                  <div className="text-xs text-gray-500 flex gap-2">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}