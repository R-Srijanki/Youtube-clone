import { SlLike, SlDislike } from "react-icons/sl";
import { IoMdMore } from "react-icons/io";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Comments({id}){
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [menuOpen, setMenuOpen] = useState(null); // for per-comment menu

    const user = useSelector((store) => store.User.user);

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
      async function handleCommentLike(commentId) {
    try {
      const res = await axios.post(
        `http://localhost:8000/videos/${id}/comments/${commentId}/like`,{},
        {
          headers: {
            'Authorization': `JWT ${localStorage.getItem("token")}`,
             "Content-Type": "application/json"
          }
        }
      );
     

      console.log(res.data);
      setComments((prev) =>
      prev.map((c) =>
        c._id == commentId ? { ...c, likes: res.data.likes, dislikes: res.data.dislikes } : c
      )
    );
    } catch (error) {
      console.log("Error while liking comment");
    }
  }

  async function handleCommentDislike(commentId) {
    try {
      const res = await axios.post(
        `http://localhost:8000/videos/${id}/comments/${commentId}/dislike`,{},
        {
          headers: {
            'Authorization': `JWT ${localStorage.getItem("token")}`,
             "Content-Type": "application/json"
          }
        }
      );
     
      console.log(res.data);
      setComments((prev) =>
      prev.map((c) =>
        c._id == commentId ? { ...c, likes: res.data.likes, dislikes: res.data.dislikes } : c
      )
    );
    } catch (error) {
      console.log("Error while disliking comment");
    }
  }

  async function handleCommentDelete(commentId) {
    try {
      const res = await axios.delete(
        `http://localhost:8000/videos/${id}/comments/${commentId}`,
        {
          headers: {
            'Authorization': `JWT ${localStorage.getItem("token")}`,
             "Content-Type": "application/json"
          }
        }
      );
     
      setComments((res) => res.filter((c) => c._id != commentId));
      console.log(res);
    } catch (error) {
      console.log("Error while deleting comment");
    }
  }
  async function handleCommentEdit(commentId) {
    try {
      const res = await axios.put(
        `http://localhost:8000/videos/${id}/comments/${commentId}`,{ text: editText },
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `JWT ${localStorage.getItem("token")}`,
          }
        }
      );

      
      console.log(res.data);

      // Update UI without full reload
      setComments((prev) =>
        prev.map((c) => (c._id == commentId ? { ...c, text: editText } : c))
      );

      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      console.log("Error while editing comment",error);
    }
  }
  async function handlecomment() {
    if (!comment.trim()) return;

    try {
      const res = await axios.post(`http://localhost:8000/videos/${id}/comments`,{ text: comment }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `JWT ${localStorage.getItem("token")}`,
        }
      });

     
      // Update UI instantly
      setComments((prev) => [res.data, ...prev]);

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
    return(
        
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

              {isWriting && (
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    onClick={handlecancel}
                    className="px-4 py-1 bg-gray-300 dark:bg-gray-600 rounded-md"
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
                        className="w-full border px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                          className="bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1">{item.text}</p>
                  )}

                  <div className="flex items-center gap-4 mt-2 text-gray-700 dark:text-gray-300">
                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleCommentLike(item._id)}
                    >
                      <SlLike />
                      <span>{item.likes?.length || 0}</span>
                    </span>

                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleCommentDislike(item._id)}
                    >
                      <SlDislike />
                      <span>{item.dislikes?.length || 0}</span>
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
    )
}