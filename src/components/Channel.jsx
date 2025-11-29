import { useSelector } from "react-redux"
import ChannelPage from "./ChannelPage";
import CreateChannel from "./CreateChannel";
import { useState } from "react";
useState
export default function Channel(){
    const user=useSelector((store)=>store.User.user);
     const [showCreate, setShowCreate] = useState(!user?.channel);
    console.log(user);
    return(
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