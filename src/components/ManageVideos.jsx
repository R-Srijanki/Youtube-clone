import axios from "axios";
import { useState,useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router";

export default function ManageVideos(){
  const user = useSelector((store) => store.User.user);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!user?.channel?._id) return;

    async function loadChannel() {
      try {
        const res = await axios.get(`http://localhost:8000/channels/${user.channel._id}`,{
          headers: {
            'Authorization': `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
        });

        setChannel(res.data.data);
        setVideos(res.data?.data.videos||[]); 
      } catch (err) {
        console.log(err.message);
      }
    }
    loadChannel();
  }, [user?.channel?._id]);
  
  function handleMenu(videoId) {
    setMenuOpen((prev) => (prev === videoId ? null : videoId));
  }
  
  function openEditModal(video) {
    setEditData({ ...video });
    setMenuOpen(null);
  }
  async function handleUpdate() {
    try {
      const res = await axios.patch(
        `http://localhost:8000/videos/${editData._id}`,editData,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `JWT ${localStorage.getItem("token")}`,
          }
        }
      );

     setVideos((prev) =>
        prev.map((v) =>
          v._id === editData._id ? { ...v, ...editData } : v
        )
      )

      setEditData(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this video permanently?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/videos/${id}`, {
        headers: {
          'Authorization': `JWT ${localStorage.getItem("token")}`,
           "Content-Type": "application/json"
        },
      });

      setVideos((prev) => prev.filter((v) => v._id != id));
    } catch (err) {
      console.log(err.message);
    }
  }
    return(
          <>
      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow hover:scale-[1.02] transition"
          >
            <Link to={`/video/${video._id}`}>
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
            </Link>

            <div className="p-3 flex gap-3 relative">
              <img
                src={channel?.avatar}
                className="h-10 w-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-sm line-clamp-2">
                  {video.title}
                </p>
                <p className="text-xs text-gray-600">{channel?.name}</p>

                <div className="text-xs text-gray-500 flex gap-2">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Menu */}
              <IoMdMore
                className="text-xl cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenu(video._id);
                }}
              />

              {menuOpen === video._id && (
                <ul className="absolute bg-white dark:bg-gray-700 shadow-md rounded-md right-2 top-8 w-28 text-sm z-20">
                  <li
                    className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => openEditModal(video)}
                  >
                    Edit
                  </li>
                  <li
                    className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-red-600"
                    onClick={() => handleDelete(video._id)}
                  >
                    Delete
                  </li>
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Edit Video</h2>

            <label className="text-sm">Title</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="border w-full p-2 rounded mb-3 dark:bg-gray-700"
            />

            <label className="text-sm">Description</label>
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="border w-full p-2 rounded mb-3 dark:bg-gray-700"
            />

            <label className="text-sm">Category</label>
            <input
              type="text"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="border w-full p-2 rounded mb-3 dark:bg-gray-700"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    )
}