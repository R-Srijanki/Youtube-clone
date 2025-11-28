import { useSelector } from "react-redux"
import ChannelPage from "./ChannelPage";
import CreateChannel from "./CreateChannel";

export default function Channel(){
    const user=useSelector((store)=>store.User.user);
    return(
        <div>
            {
                user.Channel?<ChannelPage/>:<CreateChannel/>
            }
        </div>
    )
}