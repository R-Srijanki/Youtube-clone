import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function CustomizeChannel() {
  const navigate = useNavigate();
  const user = useSelector(store => store.User.user);

  const [channel, setChannel] = useState(null);
  const [form, setForm] = useState({
    name: "",
    handle: "",
    description: "",
    channelBanner: null
  });

  const [previewBanner, setPreviewBanner] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    loadChannel();
  }, []);

  async function loadChannel() {
    try {
      const res = await axios.get(
        `http://localhost:8000/channels/${user.channel._id}`,
        { headers: { Authorization: `JWT ${localStorage.getItem("token")}` } }
      );

      const c = res.data;

      setChannel(c);

      setForm({
        name: c.name || "",
        handle: c.handle || "",
        description: c.description || "",
        channelBanner: c.channelBanner || null
      });

      setPreviewBanner(c.channelBanner || null);
    } catch (err) {
      setErrors({ server: "Failed to load channel" });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { id, value, files } = e.target;

    if (id === "channelBanner") {
      const file = files[0];
      if (!file) return;

      if (file.size > 6 * 1024 * 1024) {
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
    setSaving(true);
    setErrors({});

    try {
      const fd = new FormData();

      const safeName = form.name?.trim() || "";
      const safeHandle = form.handle?.trim() || "";
      const safeDesc = form.description?.trim() || "";

      if (safeName) fd.append("name", safeName);
      if (safeHandle) fd.append("handle", safeHandle);
      if (safeDesc) fd.append("description", safeDesc);

      if (form.channelBanner instanceof File) {
        fd.append("banner", form.channelBanner);
      }
      console.log(fd);
      await axios.patch(
        `http://localhost:8000/channels/${user.channel._id}`,
        fd,
        {
          headers: {
            "Authorization": `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      navigate("/channel");
    } catch (err) {
      console.log(err.response.data.error);
      setErrors({
        server:
          err.response?.data?.message ||
          `Update failed: ${err.message}`
      });
    }

    setSaving(false);
  }

  function handleCancel() {
    if (!channel) return;

    // reset form back to loaded channel data
    setForm({
      name: channel.name || "",
      handle: channel.handle || "",
      description: channel.description || "",
      channelBanner: channel.channelBanner || null
    });

    setPreviewBanner(channel.channelBanner || null);

    navigate("/channel");
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

      navigate("/channel");
    } catch (err) {
      setErrors({ server: "Unable to delete channel" });
    }

    setDeleteLoading(false);
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading channel customization...
      </div>
    );
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
            />
          )}

          <input
            id="channelBanner"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-4"
          />

          {errors.channelBanner && (
            <p className="text-red-600 text-sm">{errors.channelBanner}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <h2 className="text-lg font-semibold">Name</h2>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-3 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Handle */}
        <div>
          <h2 className="text-lg font-semibold">Handle</h2>

          <input
            id="handle"
            type="text"
            value={form.handle}
            onChange={handleChange}
            placeholder="@handle"
            className="w-full border p-2 rounded mt-3 bg-white dark:bg-gray-700"
          />

          <label className="text-lg font-semibold mt-4 block">
            Description
          </label>

          <textarea
            id="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Tell viewers about your channel"
            className="border w-full p-2 rounded mt-2 dark:bg-gray-700"
          />
        </div>

        {/* Buttons */}
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
              onClick={handleCancel}
              className="px-5 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              {saving ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>

      {/* Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
            <h3 className="text-xl font-semibold text-red-600">
              Delete Channel?
            </h3>

            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              This will permanently delete your channel, videos, and comments.
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
                disabled={deleteLoading}
                className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
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
