import { Link } from "react-router";

export default function Login(){
    return(
        <div className="min-h-screen flex items-center justify-center">
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" placeholder="Enter your email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Enter your password"/>
                </div>
                <button>Login</button>
                <div className="flex">
                    <p>Don't have an account</p>
                    <Link to="/register">Register</Link>
                </div>
            </form>
            
        </div>
    )
}