import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { loginUser, toggelLogin } from "../utils/userSlice";
import { useState } from "react";
export default function Register(){
    const navigate = useNavigate();
    // const dispatch=useDispatch();
    function handleregister(){
        navigate("/login");
       //  dispatch(toggelLogin());
    }
    return(
        <div className="min-h-screen flex items-center justify-center"> 
            <form>
                <div>
                    <label htmlFor="name">FullName</label>
                    <input id="name" type="text" placeholder="Enter fullname"/>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter username"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" placeholder="Enter your email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Enter your password"/>
                </div>
                <div>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="text" id="avatar" placeholder="Avatar"/>
                </div>
                <button onClick={handleregister}>Register</button>
                
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}