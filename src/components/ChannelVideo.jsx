import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChannelVideo() {
  const user = useSelector((store) => store.User.user);
  const navigate = useNavigate();
  //if user channel does not exists it goes to create channel page
  useEffect(() => {
    if (!user?.channel) {
      navigate("/channel"); // redirect if no channel created
    }
  }, [user, navigate]);
  //to store video details in useState
  const [data, setData] = useState({
    title: "",
    thumbnailUrl: "",
    videoUrl: "",
    description: "",
    category: "",
    channel: user.channel,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  //handle changes in input
  function handleChange(e) {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  }
  //when form submit it handles error and returns to channel page
  async function handleSubmit(e) {
    e.preventDefault();
    const error = {};
    let hasError = false;
    //handles errors in input fields
    if (!data.title.trim()) {
      error.title = "Enter valid title";
      hasError = true;
    }
    if (!data.thumbnailUrl.trim()) {
      error.thumbnailUrl = "Enter valid thumbnail URL";
      hasError = true;
    }
    if (!data.videoUrl.trim()) {
      error.videoUrl = "Enter valid video URL";
      hasError = true;
    }
    if (!data.description.trim()) {
      error.description = "Enter valid description";
      hasError = true;
    }
    if (!data.category.trim()) {
      error.category = "Enter valid category";
      hasError = true;
    }

    setErrors(error);
    if (hasError) return;

    try {
      const trimmeddata = {
        title: data.title.trim(),
        thumbnailUrl: data.thumbnailUrl.trim(),
        videoUrl: data.videoUrl.trim(),
        description: data.description.trim(),
        category:
          data.category.trim().charAt(0).toUpperCase() +
          data.category.trim().slice(1).toLowerCase(),
        channel: data.channel,
      };

      //send data to backend to update database of videos and channel video
      const res = await axios.post(
        "http://localhost:8000/videos",
        trimmeddata,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Video uploaded successfully!");
      setData({
        title: "",
        thumbnailUrl: "",
        videoUrl: "",
        description: "",
        category: "",
        channel: user.channel,
      });
      setTimeout(() => navigate("/channel"), 300);
      //handles error incase
    } catch (err) {
      console.log("Error during upload:", err);
      const serverMessage = err.response?.data?.message || "Upload failed";
      setErrors({ server: serverMessage });
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-4">Upload Video</h2>

      {/*form to get details from user */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && <p className="text-green-600">{success}</p>}
        {errors.server && <p className="text-red-600">{errors.server}</p>}
        {/**title */}
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter video title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title}</p>
          )}
        </div>
        {/* thumbnail url */}
        <div>
          <label htmlFor="thumbnailUrl" className="block font-medium">
            Thumbnail URL
          </label>
          <input
            type="url"
            id="thumbnailUrl"
            value={data.thumbnailUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter thumbnail URL"
          />
          {errors.thumbnailUrl && (
            <p className="text-red-600 text-sm">{errors.thumbnailUrl}</p>
          )}
        </div>
        {/* video url */}
        <div>
          <label htmlFor="videoUrl" className="block font-medium">
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            value={data.videoUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter video URL"
          />
          {errors.videoUrl && (
            <p className="text-red-600 text-sm">{errors.videoUrl}</p>
          )}
        </div>
        {/* description of video*/}
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description}</p>
          )}
        </div>
        {/* category of video */}
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={data.category}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category}</p>
          )}
        </div>
        {/*on click upload form submits */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
