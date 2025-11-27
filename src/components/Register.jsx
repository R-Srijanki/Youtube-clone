import { Link, useNavigate } from "react-router";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  function handlechange(e) {
    const { id, value } = e.target;
    setdata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }
  async function handleregister(e) {
    e.preventDefault();

    const { fullName, username, email, password } = data;
    const newErrors = {};
    let hasError = false;

    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameregex = /^([a-zA-Z\s]+)$/;

    if (!fullName.trim() || !nameregex.test(fullName.trim())) {
      newErrors.username = "Name should contain alphabets only";
      hasError = true;
    }

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
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
          setErrors({ server: json.message || "Login failed" });
          return;
      }
      navigate("/login");
    } catch (err) {
      console.log("error while register");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <form className="space-y-4" onSubmit={() => handleregister(e)}>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter full name"
              onChange={handlechange}
              value={data.fullName}
            />
            {errors.fullName&&<p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter username"
              onChange={handlechange}
              value={data.username}
            />
            {errors.username&&<p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter email"
              onChange={handlechange}
              value={data.email}
            />
            {errors.email&&<p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter password"
              onChange={handlechange}
              value={data.password}
            />
            {errors.password&&<p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link to="/login" className="text-red-600 ml-1 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
