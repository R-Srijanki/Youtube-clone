import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function ChannelPage() {
  const visible = useSelector((store) => store.Sidebar.open);
  //get visible from sidebar
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.User.user);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  //channel and videos data in state
  const [description, setDescription] = useState("");
  //to get channel details using api call
  useEffect(() => {
    async function call() {
      if (!user?.channel?._id) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:8000/channels/${user.channel._id}`,
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setChannel(res.data.data);
        // console.log(res.data.data);
        setDescription(
          `${res.data.data.name} is a channel that delivers engaging and easy-to-watch content for all audiences. With over ${res.data.data.videos.length} videos uploaded so far and a growing community of ${res.data.data.subscribers.length} subscribers, this channel shares fresh perspectives, reviews, reactions, and interesting breakdowns across different topics. Stay connected for more updates, new uploads, and enjoyable content from ${res.data.data.handle}.`
        );
        setVideos(res.data?.data.videos || []);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    call();
  }, [user?.channel?._id]);

  if (!channel || loading) return <Loading />;

  return (
    <div className="w-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-10 py-4">
      {/* Banner Section */}
      <div className="w-full h-60 bg-gray-200 dark:bg-gray-700 rounded-2xl">
        <img
          src={channel.channelBanner}
          className="w-full h-full object-cover rounded-2xl"
          alt="Channel Banner"
        />
      </div>

      {/* Channel Profile + Info */}
      <div className="py-6 flex-col md:flex gap-6 items-center">
        {/* Avatar */}
        <img
          src={channel.avatar}
          className="w-32 h-32 rounded-full border-4 border-white object-cover md:-mt-20 shadow-md z-20"
          alt="Channel Avatar"
        />

        {/* Channel Details */}
        <div className="flex flex-col px-6">
          <h1 className="text-3xl font-bold md:text-center">{channel.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-center">
            {channel.handle}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-center">
            {channel.subscribers?.length || 0} subscribers
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <Link
            to="/customizechannel"
            className="text-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Customize Channel
          </Link>
          <Link
            to="/managevideos"
            className="text-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Manage Videos
          </Link>
        </div>
      </div>

      <hr className="my-4 border-gray-300 dark:border-gray-600" />

      {/* Description */}
      <div className="">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700 dark:text-gray-300">
          {channel.description || description}
        </p>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Videos Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>

        {videos.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No videos uploaded yet.
          </p>
        )}

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
                    <p className="font-semibold text-sm line-clamp-2">
                      {video.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {channel?.name}
                    </p>

                    <div className="text-xs text-gray-500 flex gap-2 dark:text-gray-400">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>
                        {new Date(video.uploadDate).toLocaleDateString()}
                      </span>
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
