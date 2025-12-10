import Header from "./components/Header";
import { Outlet } from "react-router";
import Aside from "./components/Aside";
import { useSelector } from "react-redux";
import "./index.css";
export default function App() {
  //to check if sidebar open
  const visible = useSelector((store) => store.Sidebar.open);
  return (
    <div className="w-full h-full bg-primary dark:bg-gray-900 text-black dark:text-primary">
      <Header />
      <div className="flex w-full h-screen">
        {visible && <Aside />}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
