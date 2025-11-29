import { useParams } from "react-router";
import { SlLike, SlDislike } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import { RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Video() {
  const { id } = useParams();
  const user = useSelector((store) => store.User.user);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [menuOpen, setMenuOpen] = useState(null); // for per-comment menu

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
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setVideo((prev) => ({
        ...prev,
        subscribers: data.subscribers,
      }));
    } catch (error) {
      console.log("Error while subscribing");
    }
  }

  async function handleLike() {
    try {
      const res = await fetch(`http://localhost:8000/videos/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setVideo((prev) => ({
        ...prev,
        likes: data.likes,
        dislikes: data.dislikes,
      }));

      console.log(data);
    } catch (error) {
      console.log("Error while liking");
    }
  }

  async function handleDislike() {
    try {
      const res = await fetch(`http://localhost:8000/videos/${id}/dislike`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setVideo((prev) => ({
        ...prev,
        likes: data.likes,
        dislikes: data.dislikes,
      }));
    } catch (error) {
      console.log("Error while disliking");
    }
  }

  async function handleCommentLike(commentId) {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/comments/${commentId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();

      console.log(data);
      setComments((prev) =>
      prev.map((c) =>
        c._id === commentId ? { ...c, likes: data.likes, dislikes: data.dislikes } : c
      )
    );
    } catch (error) {
      console.log("Error while liking comment");
    }
  }

  async function handleCommentDislike(commentId) {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/comments/${commentId}/dislike`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setComments((prev) =>
      prev.map((c) =>
        c._id === commentId ? { ...c, likes: data.likes, dislikes: data.dislikes } : c
      )
    );
    } catch (error) {
      console.log("Error while disliking comment");
    }
  }

  async function handleCommentDelete(commentId) {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setComments((data) => data.filter((c) => c._id !== commentId));
      console.log(data);
    } catch (error) {
      console.log("Error while deleting comment");
    }
  }
  async function handleCommentEdit(commentId) {
    try {
      const res = await fetch(
        `http://localhost:8000/videos/${id}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text: editText }),
        }
      );

      const data = await res.json();
      console.log(data);

      // Update UI without full reload
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, text: editText } : c))
      );

      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      console.log("Error while editing comment");
    }
  }
  async function handlecomment() {
    if (!comment.trim()) return;

    try {
      const res = await fetch(`http://localhost:8000/videos/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: comment }),
      });

      const data = await res.json();

      // Update UI instantly
      setComments((prev) => [data, ...prev]);

      // Reset
      setComment("");
      setIsWriting(false);
    } catch (error) {
      console.log("Error while adding comment", error);
    }
  }
  function handlecancel() {
    setComment("");
    setIsWriting(false);
  }
  function startEditing(comment) {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
    setMenuOpen(null); // close dropdown
  }
  function cancelEditing() {
    setEditingCommentId(null);
    setEditText("");
  }

  if (loading) {
    return (
      <div className="text-center text-xl p-10 font-semibold">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return <div className="text-center text-xl p-10">Video not found.</div>;
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
          <div className="flex gap-3 mt-3">
            <img
              src={user?.avatar}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="w-full">
              <input
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (!isWriting) setIsWriting(true);
                }}
                className="w-full border p-2 rounded-md"
              />

              {isWriting && (
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    onClick={handlecancel}
                    className="px-4 py-1 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlecomment}
                    className="px-4 py-1 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
                    disabled={!comment.trim()}
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* COMMENT LIST */}
          <div className="mt-4 space-y-5">
            {comments.map((item) => (
              <div key={item._id} className="flex gap-3">
                <img
                  src={item.user?.avatar}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="w-full">
                  <p className="font-medium">{item.user?.username}</p>

                  {editingCommentId === item._id ? (
                    <div className="mt-1">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                      />
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => handleCommentEdit(item._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-300 px-3 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1">{item.text}</p>
                  )}

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

                    {/* MENU */}
                    {item.user?._id === user?._id && (
                      <div className="relative">
                        <IoMdMore
                          className="text-xl cursor-pointer"
                          onClick={() =>
                            setMenuOpen(menuOpen === item._id ? null : item._id)
                          }
                        />

                        {menuOpen === item._id && (
                          <ul className="absolute bg-white shadow-md rounded-md right-0 mt-2 w-28 text-sm">
                            <li
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => startEditing(item)}
                            >
                              Edit
                            </li>
                            <li
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                              onClick={() => handleCommentDelete(item._id)}
                            >
                              Delete
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
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
