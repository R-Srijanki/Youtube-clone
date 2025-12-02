import { Link,useParams } from "react-router"
import { useState,useEffect } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
export default function Search(){
    const {searchtext}=useParams();
    const [videos, setVideos] = useState([]);
     useEffect(() => {
        async function loadVideos() {
          try {
            const res = await axios.get("http://localhost:8000/videos");
        
            const searchrelated = res.filter((item) =>
                      item.category.toLowerCase().includes(searchtext.toLowerCase()) ||
                      item.title.toLowerCase().includes(searchtext.toLowerCase())
            );
            setVideos(searchrelated);
          } catch (err) {
            console.log("Error while fetching videos");
          }
        }
        loadVideos();
      }, [searchtext]);
    return(
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/videos/${video._id}`}
            className="block hover:scale-105 transition-transform"
          >
            <VideoCard video={video}/>
          </Link>
        ))}
      </div>
    )
}