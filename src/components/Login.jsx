import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toggelLogin,loginUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

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

    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameregex = /^([a-zA-Z\s]+)$/;

    if (!username.trim() || !nameregex.test(username.trim())) {
      newErrors.username = "Username should contain alphabets only";
      hasError = true;
    }

    if (!email.trim() || !emailregex.test(email.trim())) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    if (!password.trim() || !passwordregex.test(password.trim())) {
      newErrors.password =
        "Password must be 8+ chars with 1 lowercase, 1 uppercase, 1 digit, and 1 special char";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;
      try {

          const res=await fetch("http://localhost:8000/login",{
            method:"POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          console.log(res);
          const json=await res.json();
          console.log(json);
           if (!res.ok) {
           setErrors({ server: json.message || "Login failed" });
            return;
          }
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