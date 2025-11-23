export default function Home(){
    return(
       <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Video Cards will load here */}
        <div className="h-40 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </div>
    )
}