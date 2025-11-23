import Header from "./components/header"
import Home from "./components/Home"
import Aside from "./components/Aside";
import { useSelector } from "react-redux";

export default function App() {
 
  const visible=useSelector(store=>store.Sidebar.open);
    return (
    <div className="w-full h-screen overflow-hidden">
      <Header />
      <div className="flex w-full">
        {visible && <Aside />}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );

}


