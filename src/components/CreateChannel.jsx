import { useState } from "react";

export default function CreateChannel() {
  const [data, setData] = useState({
    name: "",
    handle: "",
    channelBanner: null
  });

  const [previewBanner, setPreviewBanner] = useState(null);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { id, value, files } = e.target;

    if (id === "channelBanner") {
      const file = files[0];
      setData({ ...data, channelBanner: file });
      setPreviewBanner(URL.createObjectURL(file));
    } else {
      setData({ ...data, [id]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const error = {};
    let hasError = false;

    if (!data.name.trim()) {
      error.name = "Enter valid channel name";
      hasError = true;
    }
    if (!data.handle.trim() || data.handle[0] !== "@") {
      error.handle = "Handle must start with @";
      hasError = true;
    }
    if (!data.channelBanner) {
      error.channelBanner = "Select a channel banner";
      hasError = true;
    }

    setErrors(error);
    if (hasError) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("handle", data.handle);
      formData.append("channelBanner", data.channelBanner);

      const res = await fetch("http://localhost:8000/channels", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      const json = await res.json();
      console.log(json);

      if (!res.ok) {
        setErrors({ server: json.message || "Channel creation failed" });
      }
    } catch (err) {
      console.log("Error creating channel:", err);
      setErrors({ server: "Something went wrong" });
    }
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-[550px] bg-white shadow-lg rounded-xl p-8 relative"
      >
        {/* Banner with blur */}
        <div className="w-full h-40 rounded-xl overflow-hidden relative">
          {previewBanner ? (
            <img
              src={previewBanner}
              alt="banner preview"
              className="w-full h-full object-cover blur-[1px]"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              Select a banner
            </div>
          )}
        </div>

        {/* Avatar overlay */}
        <div className="w-full flex justify-center -mt-14">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.name || "User"
            )}&background=random`}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <div className="mt-6">
          <label className="font-medium">Channel Banner</label>
          <input
            id="channelBanner"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="block mt-1"
          />
          {errors.channelBanner && (
            <p className="text-red-600 text-sm">{errors.channelBanner}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="font-medium">Name</label>
          <input
            id="name"
            type="text"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div className="mt-4">
          <label className="font-medium">Handle</label>
          <input
            id="handle"
            type="text"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="@username"
          />
          {errors.handle && (
            <p className="text-red-600 text-sm">{errors.handle}</p>
          )}
        </div>

        <p className="text-gray-500 text-xs mt-3 leading-5">
          By clicking Create, you agree to YouTube's Terms of Service.
        </p>

        {errors.server && (
          <p className="text-red-600 text-sm mt-2">{errors.server}</p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-5 py-2 rounded-full hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
