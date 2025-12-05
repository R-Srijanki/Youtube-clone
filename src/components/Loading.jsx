export default function Loading(){
    return (
    <div className="p-6 max-w-3xl mx-auto animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6" />

      <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

      <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

      <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
      <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

      <div className="flex justify-between mt-6">
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}