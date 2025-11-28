import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import VideoCard from "./VideoCard";

export default function ChannelPage() {
  const channelId = useSelector((store) => store.User.user.channel?._id);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function call() {
      try {
        const res = await fetch(`http://localhost:8000/channels/${channelId}`, {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        });

        const json = await res.json();
        
        setChannel(json.data);
        setVideos(json.data?.videos?.slice(0, 3) || []);  // FIX: use slice, not splice
      } catch (err) {
        console.log(err.message);
      }
    }
    if (channelId) call();
  }, [channelId]);

  if (!channel) return <p className="p-10 text-lg">Loading...</p>;

  return (
    <div className="w-full flex flex-col">

      {/* Banner Section */}
      <div className="w-full h-60 bg-gray-200 relative">
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
          <p className="text-gray-600 text-sm">{channel.handle}</p>
          <p className="text-gray-500 text-xs">
            {channel.subscribers?.length || 0} subscribers
          </p>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded-full font-medium hover:bg-gray-300">
              Customize Channel
            </button>
            <button className="px-4 py-2 bg-gray-100 border rounded-full font-medium hover:bg-gray-200">
              Manage Videos
            </button>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Description */}
      <div className="px-10">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{channel.description || "No description added."}</p>
      </div>

      <hr className="my-6" />

      {/* Videos Section */}
      <div className="px-10 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>

        {videos.length === 0 && (
          <p className="text-gray-500">No videos uploaded yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/videos/${video._id}`}
              className="hover:scale-[1.03] transition-transform"
            >
              <VideoCard video={video} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}