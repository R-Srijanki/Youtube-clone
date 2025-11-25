import { useParams } from "react-router";
import { SlLike, SlDislike } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import { RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";

export default function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideo() {
      try {
        const resVideo = await fetch(`http://localhost:8000/videos/${id}`);
        const resComments = await fetch(
          `http://localhost:8000/videos/${id}/comments`
        );

        const videoData = await resVideo.json();
        const commentData = await resComments.json();

        setVideo(videoData);
        setComments(commentData);
        setLoading(false);
      } catch (err) {
        console.log("Error while fetching video", err);
        setLoading(false);
      }
    }
    loadVideo();
  }, [id]);


  async function handleSubscribe() {
    try {
      const res = await fetch(
        `http://localhost:8000/channels/${video.channel._id}/subscribe`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      console.log(data);
    } catch {
      console.log("Error while subscribing");
    }
  }

  async function handleLike() {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/like`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      console.log(data);
    } catch {
      console.log("Error while liking");
    }
  }

  async function handleDislike() {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/dislike`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      console.log(data);
    } catch {
      console.log("Error while disliking");
    }
  }

  async function handleCommentLike(commentId) {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/comments/${commentId}/like`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      console.log(data);
    } catch {
      console.log("Error while liking comment");
    }
  }

  async function handleCommentDislike(commentId) {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/comments/${commentId}/dislike`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      console.log(data);
    } catch {
      console.log("Error while disliking comment");
    }
  }

  if (loading) {
    return (
      <div className="text-center text-xl p-10 font-semibold">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center text-xl p-10">
        Video not found.
      </div>
    );
  }

  return (
    <div className="md:flex gap-4 p-4">
      {/* LEFT SIDE — VIDEO PLAYER */}
      <div className="md:w-[75%]">
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
              <p className="text-gray-600 text-sm">
                {video.channel?.subscribers?.length} subscribers
              </p>
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Subscribe
          </button>
        </div>

        {/* LIKE / DISLIKE */}
        <div className="flex items-center gap-4 mt-5">
          <div
            className="flex items-center gap-1 cursor-pointer bg-gray-200 rounded-full px-3 py-2"
            onClick={handleLike}
          >
            <SlLike />
            <span>{video.likes?.length}</span>
          </div>

          <div
            className="flex items-center gap-1 cursor-pointer bg-gray-200 rounded-full px-3 py-2"
            onClick={handleDislike}
          >
            <SlDislike />
            <span>{video.dislikes?.length}</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer bg-gray-200 rounded-full px-3 py-2">
            <IoMdShareAlt />
            <span>Share</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer bg-gray-200 rounded-full px-3 py-2">
            <RiDownloadLine />
            <span>Download</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <p>{video.description}</p>
        </div>

        {/* COMMENTS */}
        <div className="mt-6">
          <p className="font-semibold text-lg">{comments.length} Comments</p>

          {/* Add Comment */}
          <div className="flex items-center gap-3 mt-3">
            <input
              placeholder="Add a comment..."
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* COMMENT LIST */}
          <div className="mt-4 space-y-5">
            {comments.map((item) => (
              <div key={item._id} className="flex gap-3">
                <img
                  src={item.user?.avatar}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-medium">{item.user?.username}</p>
                  <p>{item.text}</p>

                  <div className="flex items-center gap-4 mt-2 text-gray-700">
                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleCommentLike(item._id)}
                    >
                      <SlLike />
                      <span>{item.like?.length || 0}</span>
                    </span>

                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleCommentDislike(item._id)}
                    >
                      <SlDislike />
                      <span>{item.dislike?.length || 0}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — Suggested Videos */}
      <div className="md:w-[25%]">
        {/* In future — show recommended videos */}
      </div>
    </div>
  );
}