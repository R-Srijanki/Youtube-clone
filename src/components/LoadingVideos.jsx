export default function LoadingVideos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow"
        >
          <div className="h-40 bg-gray-300 dark:bg-gray-700" />
          <div className="p-3">
            <div className="flex gap-3">
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
