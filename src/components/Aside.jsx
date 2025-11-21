import { useContext } from "react";
import asidecontext from "../Context/useContext";
export default function Aside(){
    const {visible}=useContext(asidecontext);
    return(
        <>
         {
                visible && (
    <aside className="w-1/5 h-screen bg-gray-100 p-4">
      <ul className="flex flex-col gap-3">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </aside>)
            }
            
        </>
    )
}