import { useSelector } from "react-redux"
import ChannelPage from "./ChannelPage";
import CreateChannel from "./CreateChannel";
import { useState } from "react";
useState
export default function Channel(){
    const user=useSelector((store)=>store.User.user);
    //to get user details
     const [showCreate, setShowCreate] = useState(!user?.channel);
     //to check if channel exists
    //console.log(user);
    return(//this opens channel page if exists else create channel page
        <div>
             {user?.channel ? (
        <ChannelPage />
      ) : (
        showCreate && (
          <CreateChannel
            onClose={() => setShowCreate(false)} // handle modal close
          />
        )
      )}
        </div>
    )
}