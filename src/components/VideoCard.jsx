export default function VideoCard({video}){
    return(
        <div className="rounded-lg overflow-hidden shadow-sm bg-white">
              
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

                <div>
                  <p className="font-semibold text-sm line-clamp-2">{video.title}</p>
                  <p className="text-xs text-gray-600">{video.channel?.name}</p>

                  <div className="text-xs text-gray-500 flex gap-2">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

            </div>
    )
}