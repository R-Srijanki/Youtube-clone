import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login(){
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [username,setusername]=useState("");
    const navigate=useNavigate();
    function handleemail(e){
      setemail(e.target.value);
    }
    function handlepassword(e){
      setpassword(e.target.value);
    }
    function handlename(e){
      setusername(e.target.value);
    }
    async function handlelog(e){
      try {
           e.preventDefault();
          const res=await fetch("http://localhost:8000/login",{
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({username:username,email:email,password:password})
          });
          console.log(res);
          const json=await res.json();
          console.log(json);
          localStorage.setItem("token",json.accessToken);
          setemail("");
          setusername("");
          setpassword("");
         navigate("/");
      } catch (err) {
        console.log("error while login")
      }
    }
    return(
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign In
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your username"
              onChange={handlename}
              value={username}
            />
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
              onChange={handleemail}
              value={email}
            />
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
              onChange={handlepassword}
              value={password}
            />
          </div>

          <button onClick={handlelog} className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
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