import { Link,useNavigate } from "react-router";


export default function Register(){
    const navigate = useNavigate();
    function handleregister(e){
        e.preventDefault();
        navigate("/login");
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form className="space-y-4" onSubmit={()=>handleregister(e)}>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Avatar URL</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Avatar image url"
            />
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
    )
}