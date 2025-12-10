export default function VideoCard({ video }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-40 object-cover"
      />

      {/* Video Info */}
      <div className="p-3 flex gap-3">
        {/* Channel Avatar */}
        <img
          src={video.channel?.avatar}
          alt={video.channel?.name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <p className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-gray-100">
            {video.title}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {video.channel?.name}
          </p>
          {/**views and upload date of video */}
          <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-2">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
