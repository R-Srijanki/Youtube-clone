import { useParams } from "react-router-dom";
import { SlLike, SlDislike } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import { RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import VideoSection from "./VideoSection";
import axios from "axios";
export default function Video() {
  const { id } = useParams();
  //get video data by id from url
  const user = useSelector((store) => store.User);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribe, setSubscribe] = useState(false);
  //to get video details
  useEffect(() => {
    async function loadVideo() {
      try {
        const resVideo = await axios.get(`http://localhost:8000/videos/${id}`);
        setVideo(resVideo.data);
        //handle subscribe
        if (resVideo.data.channel?.subscribers?.includes(user?.user?._id)) {
          setSubscribe(true);
        } else {
          setSubscribe(false);
        }

        setLoading(false);
      } catch (err) {
        console.log("Error while fetching video", err);
        setLoading(false);
      }
    }
    loadVideo();
  }, [id]);
  //to handle subscribe
  async function handleSubscribe() {
    try {
      const res = await axios.post(
        `http://localhost:8000/channels/${video.channel._id}/subscribe`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      //to get updated subscribers details
      const updatedSubscribers = res.data.subscribers || [];

      if (updatedSubscribers.includes(user.user._id)) {
        setSubscribe(true);
      } else {
        setSubscribe(false);
      }
      //update details
      setVideo((prev) => ({
        ...prev,
        channel: {
          ...prev.channel,
          subscribers: updatedSubscribers,
        },
      }));
    } catch (error) {
      console.log("Error while subscribing", error);
    }
  }
  //handle like of video
  async function handleLike() {
    try {
      const res = await axios.post(
        `http://localhost:8000/videos/${id}/like`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      //update details
      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));

      console.log(res.data);
    } catch (error) {
      console.log("Error while liking");
    }
  }
  //handle dislike of video
  async function handleDislike() {
    try {
      const res = await axios.post(
        `http://localhost:8000/videos/${id}/dislike`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      //update details
      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));
    } catch (error) {
      console.log("Error while disliking");
    }
  }

  if (loading) {
    return (
      <div className="text-center text-xl p-10 font-semibold text-gray-900 dark:text-gray-100">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center text-xl p-10 text-gray-900 dark:text-gray-100">
        Video not found.
      </div>
    );
  }

  return (
    <div
      className="lg:flex gap-4 p-4 bg-white dark:bg-gray-900 
                    text-gray-900 dark:text-gray-100 md:px-10"
    >
      {/* LEFT SIDE — VIDEO PLAYER */}
      <div className="md:w-full lg:w-[70%]">
        <iframe
          src={video.videoUrl}
          className="w-full h-[250px] md:h-[350px] lg:h-[500px] rounded-lg"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />

        <p className="text-xl font-semibold mt-3">{video.title}</p>

        {/* CHANNEL INFO */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <img
              src={video.channel?.avatar}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{video.channel?.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {video.channel?.subscribers?.length} subscribers
              </p>
            </div>
          </div>

          {!(video?.uploader._id == user.user._id) && (
            <button
              onClick={handleSubscribe}
              className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              {subscribe ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>

        {/* LIKE / DISLIKE */}
        <div className="flex items-center gap-4 mt-5">
          <div
            className="flex items-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2"
            onClick={handleLike}
          >
            <SlLike />
            <span>{video.likes?.length || 0}</span>
          </div>

          <div
            className="flex items-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2"
            onClick={handleDislike}
          >
            <SlDislike />
            <span>{video.dislikes?.length || 0}</span>
          </div>
          {/**share */}
          <div className="flex items-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2">
            <IoMdShareAlt />
            <span>Share</span>
          </div>
          {/**download */}
          <div className="flex items-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2">
            <RiDownloadLine />
            <span>Download</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4 text-gray-900 dark:text-gray-200">
          <div className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span>{video.views} views</span>
            <span>{new Date(video.createdAt)?.toDateString()}</span>
          </div>
          <p>{video.description}</p>
        </div>

        {/* COMMENTS */}
        {user.loggedIn && <Comments id={id} />}
      </div>

      {/* RIGHT SIDE — Suggested Videos */}
      <div className="md:w-full lg:w-[30%]">
        {/* In future — show recommended videos */}
        <VideoSection category={video.category} currentVideoId={video._id} />
      </div>
    </div>
  );
}
