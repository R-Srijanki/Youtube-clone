import { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import asidecontext from "../Context/useContext";
export default function Header(){
    const {visible,setvisible}=useContext(asidecontext);
    function handleclick(){
        setvisible(!visible);
    }
    return(
        <div>
            <header className="flex justify-between w-screen">
                <button onClick={handleclick}><RxHamburgerMenu/></button>
                <h1>Youtube</h1>
            </header>
        </div>
    )
}