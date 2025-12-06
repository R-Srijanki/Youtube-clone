import { Link,useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingVideos from "./LoadingVideos";
export default function Search(){
    const visible=useSelector(store=>store.Sidebar.open);
    const {searchtext}=useParams();
    const [loading,setLoading]=useState(true);
    //get searchtext from url
    //store videos
    const [videos, setVideos] = useState([]);
    //get videos from api
     useEffect(() => {
        async function loadVideos() {
          try {
            const res = await axios.get("http://localhost:8000/videos");
            //search based on title
            const searchrelated = res.data.filter((item) =>
                      (item.category || '').toLowerCase().includes(searchtext.toLowerCase()) ||
                      item.title.toLowerCase().includes(searchtext.toLowerCase())
            );
            setVideos(searchrelated);
          } catch (err) {
            console.log("Error while fetching videos");
          }
          finally{
            setLoading(false);
          }
        }
        loadVideos();
      }, [searchtext]);
      if(loading){
        return (<LoadingVideos/>)
      }
    return(
      <>
        {videos.length === 0 && (
          <p className="text-gray-800 dark:text-gray-400 text-center">No videos related to {searchtext}</p>
        )}
       <div className={!visible?"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6":"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
         {videos.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="block hover:scale-105 transition-transform cursor-pointer"
          >
            <VideoCard video={video}/>
          </Link>
        ))}
      </div>
      </>
    )
}