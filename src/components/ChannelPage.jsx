import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function ChannelPage() {
  const user = useSelector((store) => store.User.user);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get(`http://localhost:8000/channels/${user.channel._id}`, {
          headers: {
            "Authorization": `JWT ${localStorage.getItem("token")}`,
             "Content-Type": "application/json"
          }
        });
        setChannel(res.data.data);
        setVideos(res.data?.data.videos?.slice(0, 3) || []);  
      } catch (err) {
        console.log(err.message);
      }
    }
    if (user.channel._id) call();
  }, [user.channel._id]);

  if (!channel) return <p className="p-10 text-lp-10 text-lg text-gray-900 dark:text-gray-100g">Loading...</p>;

  return (
    <div className="w-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Banner Section */}
      <div className="w-full h-60 bg-gray-200 dark:bg-gray-700 relative">
        <img
          src={channel.channelBanner}
          className="w-full h-full object-cover"
          alt="Channel Banner"
        />
      </div>

      {/* Channel Profile + Info */}
      <div className="px-10 py-6 flex gap-6 items-center">
        {/* Avatar */}
        <img
          src={channel.avatar}
          className="w-32 h-32 rounded-full border-4 border-white object-cover -mt-20 shadow-md"
          alt="Channel Avatar"
        />

        {/* Channel Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{channel.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{channel.handle}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            {channel.subscribers?.length || 0} subscribers
          </p>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600">
              Customize Channel
            </button>
            <Link to="/managevideos" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
              Manage Videos
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-300 dark:border-gray-600" />

      {/* Description */}
      <div className="px-10">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 dark:text-gray-300">{channel.description || "No description added."}</p>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Videos Section */}
      <div className="px-10 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>

        {videos.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No videos uploaded yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/videos/${video._id}`}
              className="hover:scale-[1.03] transition-transform"
            >
              <div className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800">
              
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
                  src={channel.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-sm line-clamp-2">{video.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{channel?.name}</p>

                  <div className="text-xs text-gray-500 flex gap-2 dark:text-gray-400">
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
    </div>
  );
}