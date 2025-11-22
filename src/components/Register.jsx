import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { loginUser, toggelLogin } from "../utils/userSlice";
import { useState } from "react";
export default function Register(){
    const navigate = useNavigate();
    const dispatch=useDispatch();
    function handleregister(){
        navigate("/");
        dispatch(toggelLogin());
    }
    return(
        <div className="min-h-screen flex items-center justify-center"> 
            <form>
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
                    <label htmlFor="phone">Contact</label>
                    <input type="number" id="phone" placeholder="Enter phone number"/>
                </div>
                <button onClick={handleregister}>Register</button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}