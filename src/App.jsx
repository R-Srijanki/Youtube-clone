import Header from "./components/Header"
import { Outlet } from "react-router";
import Aside from "./components/Aside";
import { useSelector } from "react-redux";
import './index.css'
export default function App() {
 //to check if sidebar open
  const visible=useSelector(store=>store.Sidebar.open);
    return (
    <div className="w-full min-h-screen bg-primary dark:bg-primary-dark text-black dark:text-primary">
      <Header />
      <div className="flex w-full h-full">
        {visible && <Aside />}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-primary-dark p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );

}


