import asidecontext from "../Context/useContext";
import { useContext } from "react";
export default function Home(){
    const {visible}=useContext(asidecontext);
    return(
      
              <div className={visible ? "w-4/5" : "w-full"}>
        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/9/1/8c35e21d-6b03-4702-b9da-8eb4e357b616_442144.JPG"></img>
        </div>
    )
}