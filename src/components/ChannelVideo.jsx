import { useState } from "react";
import { useSelector } from "react-redux";

export default function ChannelVideo() {
  const user = useSelector((store) => store.User.user);

  const [data, setData] = useState({
    title: "",
    thumbnailUrl: "",
    videoUrl: "",
    description: "",
    category: "",
    channel: user.channel || "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const error = {};
    let hasError = false;

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
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("thumbnailUrl", data.thumbnailUrl);
      formData.append("videoUrl", data.videoUrl);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("channel", data.channel);

      const res = await fetch("http://localhost:8000/videos", {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        setErrors({ server: json.message || "Video upload failed" });
      } else {
        setSuccess("Video uploaded successfully!");
        setData({
          title: "",
          thumbnailUrl: "",
          videoUrl: "",
          description: "",
          category: "",
          channel: user.channel || "",
        });
        
      }
    } catch (err) {
      console.log("Error during upload:", err);
      setErrors({ server: "Something went wrong" });
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && <p className="text-green-600">{success}</p>}
        {errors.server && <p className="text-red-600">{errors.server}</p>}

        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Enter video title"
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="thumbnailUrl" className="block font-medium">
            Thumbnail URL
          </label>
          <input
            type="url"
            id="thumbnailUrl"
            value={data.thumbnailUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Enter thumbnail URL"
          />
          {errors.thumbnailUrl && <p className="text-red-600 text-sm">{errors.thumbnailUrl}</p>}
        </div>

        <div>
          <label htmlFor="videoUrl" className="block font-medium">
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            value={data.videoUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Enter video URL"
          />
          {errors.videoUrl && <p className="text-red-600 text-sm">{errors.videoUrl}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Enter description"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={data.category}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Enter category"
          />
          {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}