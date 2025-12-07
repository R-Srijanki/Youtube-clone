import { useSelector } from "react-redux"
import ChannelPage from "./ChannelPage";
import CreateChannel from "./CreateChannel";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function Channel(){
    const user=useSelector((store)=>store.User.user);
    const navigate=useNavigate();
    //to get user details
     const [showCreate, setShowCreate] = useState(!user?.channel);
     //to check if channel exists
     function onClose(){
        setShowCreate(false);
        navigate('/');
     }
    return(//this opens channel page if exists else create channel page
        <div className="w-full h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
             {user?.channel ? (
        <ChannelPage />
      ) : (
        showCreate && (
          <CreateChannel
            onClose={onClose} // handle modal close
          />
        )
      )}
        </div>
    )
}