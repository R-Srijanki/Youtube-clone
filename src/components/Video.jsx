import { useParams } from "react-router";
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
  const user = useSelector((store) => store.User);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribe, setSubscribe] = useState(false);
  useEffect(() => {
    async function loadVideo() {
      try {
        const resVideo = await axios.get(`http://localhost:8000/videos/${id}`);
        setVideo(resVideo.data);
        if (resVideo.data.channel.subscribers.includes(user.user._id)) {
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
  }, [id, user.user._id]);

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

      // Case 2: User subscribed → full channel returned
      const updatedSubscribers = res.data.subscribers || [];

      if (updatedSubscribers.includes(user.user._id)) {
        setSubscribe(true);
        console.log("in");
      } else {
        setSubscribe(false);
        console.log("out");
      }
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

      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.dislikes,
      }));

      console.log(res.data);
    } catch (error) {
      console.log("Error while liking");
    }
  }

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
      className="md:flex gap-4 p-4 bg-white dark:bg-gray-900 
                    text-gray-900 dark:text-gray-100"
    >
      {/* LEFT SIDE — VIDEO PLAYER */}
      <div className="md:w-[70%]">
        <iframe
          src={video.videoUrl}
          className="w-full h-[350px] md:h-[500px] rounded-lg"
          allowFullScreen
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
            <span>{video.likes?.length}</span>
          </div>

          <div
            className="flex items-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2"
            onClick={handleDislike}
          >
            <SlDislike />
            <span>{video.dislikes?.length}</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2">
            <IoMdShareAlt />
            <span>Share</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2">
            <RiDownloadLine />
            <span>Download</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4 text-gray-900 dark:text-gray-200">
          <p>{video.description}</p>
        </div>

        {/* COMMENTS */}
        {user.loggedIn && <Comments id={id} />}
      </div>

      {/* RIGHT SIDE — Suggested Videos */}
      <div className="md:w-[30%]">
        {/* In future — show recommended videos */}
        <VideoSection category={video.category} currentVideoId={video._id} />
      </div>
    </div>
  );
}
