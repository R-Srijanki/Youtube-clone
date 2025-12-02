import { useState } from "react";
import axios from "axios";

export default function CustomizeChannel({ channel, onClose, refresh }) {
  const [form, setForm] = useState({
    name: channel?.name || "",
    handle: channel?.handle || "",
    channelBanner: null
  });

  const [previewBanner, setPreviewBanner] = useState(
    channel?.bannerUrl || null
  );

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function handleChange(e) {
    const { id, value, files } = e.target;

    if (id === "channelBanner") {
      const file = files[0];

      if (file && file.size > 6 * 1024 * 1024) {
        setErrors({ channelBanner: "File must be under 6MB" });
        return;
      }

      setForm(prev => ({ ...prev, channelBanner: file }));
      setPreviewBanner(URL.createObjectURL(file));
      return;
    }

    setForm(prev => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("handle", form.handle);
      if (form.channelBanner) fd.append("banner", form.channelBanner);

      const res = await axios.put(
        `http://localhost:8000/channels/${channel._id}`,
        fd,
        {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` }
        }
      );

      refresh();  
      onClose();  
    } catch (err) {
      setErrors({ server: err.response?.data?.message || "Update failed" });
    }

    setLoading(false);
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await axios.delete(
        `http://localhost:8000/channels/${channel._id}`,
        {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` }
        }
      );

      window.location.href = "/";
    } catch (err) {
      setErrors({ server: "Unable to delete channel" });
    }
    setDeleteLoading(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto text-black dark:text-gray-100">
      <h1 className="text-2xl font-semibold mb-6">Channel Customization</h1>

      {errors.server && (
        <p className="text-red-600 font-medium mb-4">{errors.server}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Banner */}
        <div>
          <h2 className="text-lg font-semibold">Banner Image</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This image appears at the top of your channel.
          </p>

          {previewBanner && (
            <img
              src={previewBanner}
              className="w-full h-40 object-cover rounded-lg mt-4"
              alt="banner"
            />
          )}

          <div className="mt-4">
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
        </div>

        {/* Name */}
        <div>
          <h2 className="text-lg font-semibold">Name</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose a name that represents your content.
          </p>

          <div className="mt-3">
            <label className="font-medium">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Handle */}
        <div>
          <h2 className="text-lg font-semibold">Handle</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unique identifier for your channel.
          </p>

          <div className="mt-3">
            <label className="font-medium">Handle</label>
            <input
              id="handle"
              type="text"
              value={form.handle}
              onChange={handleChange}
              placeholder="@username"
              className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700"
            />
            {errors.handle && (
              <p className="text-red-600 text-sm">{errors.handle}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-5">
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white"
          >
            Delete Channel
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
            <h3 className="text-xl font-semibold text-red-600">
              Delete Channel?
            </h3>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              This will permanently delete your channel, all videos, and comments.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}