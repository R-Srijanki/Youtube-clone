import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toggelLogin,loginUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Login(){
    const [data,setdata]=useState({
      username:"",
      email:"",
      password:""
    });
    const dispatch=useDispatch();
    const [errors,setErrors]=useState({});
    const navigate=useNavigate();
    function handlechange(e) {
    const { id, value } = e.target;
    setdata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }
    async function handlelog(e){
      e.preventDefault();

    const { username, email, password } = data;
    const newErrors = {};
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      hasError = true;
    }

    if (!email.trim()) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password =
        "Password is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;
      try {

          const res=await axios.post("http://localhost:8000/login",data,{
            headers: {
            "Content-Type": "application/json"
            }
          });
      
          console.log(res);
          localStorage.setItem("token",json.accessToken);
          dispatch(toggelLogin());
          dispatch(loginUser(json.user));
         navigate("/");
      } catch (error) {
        console.log("Error while login", error);
      setErrors({ server: "Something went wrong" });
      }
    }
    return(
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign In
        </h1>

        <form className="space-y-4" onSubmit={handlelog}>
          {errors.server && (
            <p className="text-sm text-red-600">{errors.server}</p>
          )}
          <div>
            <label className="block font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your username"
              onChange={handlechange}
              value={data.username}
            />
            {errors.username&&<p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              onChange={handlechange}
              value={data.email}
            />
            {errors.email&&<p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              onChange={handlechange}
              value={data.password}
            />
            {errors.password&&<p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <Link to="/register" className="text-red-600 ml-1 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
    )
}