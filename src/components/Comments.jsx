import { SlLike, SlDislike } from "react-icons/sl";
import { IoMdMore } from "react-icons/io";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Comments({ id }) {
  const [comment, setComment] = useState("");
  //add comment
  const [comments, setComments] = useState([]);
  //store comments after fetching from backend
  const [isWriting, setIsWriting] = useState(false);
  //to handle edit comment
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  //to open options edit and delete on click on : near comment only on comments made by user
  const [menuOpen, setMenuOpen] = useState(null); // for per-comment menu
  const [errors, setErrors] = useState({});
  const user = useSelector((store) => store.User.user);
  //to fetch comments from backend
  useEffect(() => {
    async function loadComments() {
      try {
        const resComments = await axios.get(
          `http://localhost:8000/videos/${id}/comments`
        );

        setComments(resComments.data);
      } catch (err) {
        console.log("Error while fetching video", err);
      }
    }
    loadComments();
  }, [id]);
  //handles like on comment and saves its back to database
  async function handleCommentLike(commentId) {
    try {
      const res = await axios.post(
        `http://localhost:8000/videos/${id}/comments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      //console.log(res.data);//update details
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, likes: res.data.likes, dislikes: res.data.dislikes }
            : c
        )
      );
    } catch (error) {
      console.log("Error while liking comment");
    }
  }
  //handles dislike on comment and saves its back to database
  async function handleCommentDislike(commentId) {
    try {
      const res = await axios.post(
        `http://localhost:8000/videos/${id}/comments/${commentId}/dislike`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      //update details
      //console.log(res.data);
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, likes: res.data.likes, dislikes: res.data.dislikes }
            : c
        )
      );
    } catch (error) {
      console.log("Error while disliking comment");
    }
  }
  //deletes comment from database and updates comments
  async function handleCommentDelete(commentId) {
    try {
      const res = await axios.delete(
        `http://localhost:8000/videos/${id}/comments/${commentId}`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      //update details
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      //console.log(res);
    } catch (error) {
      console.log("Error while deleting comment");
    }
  }

  //handles edit on comment and saves its back to database
  async function handleCommentEdit(commentId) {
    if (!editText.trim()) {
      setErrors({ edit: "Comment cannot be empty" });
      return;
    }
    try {
      const res = await axios.patch(
        `http://localhost:8000/videos/${id}/comments/${commentId}`,
        { text: editText.trim() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      ); // console.log(res.data);
      // Update UI without full reload
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, text: editText.trim() } : c
        )
      );

      setEditingCommentId(null);
      setEditText("");
      setErrors({});
    } catch (error) {
      console.log("Error while editing comment", error);
    }
  }
  //write new comment and saves its back to database
  async function handlecomment() {
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/videos/${id}/comments`,
        { text: comment.trim() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update UI instantly
      setComments((prev) => [res.data, ...prev]);
      // Reset
      setComment("");
      setIsWriting(false);
    } catch (error) {
      console.log("Error while adding comment", error);
    }
  }
  //to cancel new comment update
  function handlecancel() {
    setComment("");
    setIsWriting(false);
  }
  //to handle edit comment
  function startEditing(comment) {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
    setMenuOpen(null); // close dropdown
  }
  //to cancel edit changes
  function cancelEditing() {
    setEditingCommentId(null);
    setEditText("");
    setErrors({});
  }
  return (
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
            className="w-full border p-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          {/*opens on add comment */}
          {isWriting && (
            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={handlecancel}
                className="px-4 py-1 bg-gray-300 dark:bg-gray-600 rounded-md cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handlecomment}
                className="px-4 py-1 bg-blue-600 text-white rounded-md disabled:bg-blue-300 cursor-pointer"
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
              {/*opens when you click on edit option else shows comment text*/}
              {editingCommentId === item._id ? (
                <div className="mt-1">
                  <input
                    value={editText}
                    maxLength={500}
                    onChange={(e) => {
                      setEditText(e.target.value);
                      if (errors.edit) setErrors({});
                    }}
                    className={`w-full border px-3 py-2 rounded-md ${
                      errors.edit
                        ? "border-red-500"
                        : "bg-white dark:bg-gray-700"
                    } text-gray-900 dark:text-gray-100`}
                  />
                  {errors.edit && (
                    <p className="text-red-500 text-xs mt-1">{errors.edit}</p>
                  )}
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleCommentEdit(item._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded-md cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1">{item.text}</p>
              )}
              {/**like comment */}
              <div className="flex items-center gap-4 mt-2 text-gray-700 dark:text-gray-300">
                <span
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleCommentLike(item._id)}
                >
                  <SlLike />
                  <span>{item.likes?.length || 0}</span>
                </span>
                {/**dislike comment */}
                <span
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleCommentDislike(item._id)}
                >
                  <SlDislike />
                  <span>{item.dislikes?.length || 0}</span>
                </span>

                {/* MENU for edit and delete only visible if written by user*/}
                {item.user?._id === user?._id && (
                  <div className="relative">
                    <IoMdMore
                      className="text-xl cursor-pointer"
                      onClick={() =>
                        setMenuOpen(menuOpen === item._id ? null : item._id)
                      }
                    />
                    {/**select edit or delete */}
                    {menuOpen === item._id && (
                      <ul className="absolute bg-white dark:bg-gray-700 shadow-md rounded-md right-0 mt-2 w-28 text-sm z-10">
                        <li
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => startEditing(item)}
                        >
                          Edit
                        </li>
                        <li
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-red-600"
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
  );
}
