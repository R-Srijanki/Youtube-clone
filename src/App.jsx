import Header from "./components/header"
import Home from "./components/Home"
import { useState } from "react";
//import asidecontext from "./Context/useContext";
import Aside from "./components/Aside";


import { useSelector } from "react-redux";
function App() {
 
  // const [visible,setvisible]=useState(false);
  const visible=useSelector(store=>store.Sidebar.open);
  return (
    // <asidecontext.Provider value={{visible:visible,setvisible}}>
     <>
      <Header />
      <div className="flex">
        {visible&&<Aside/>}
        <Home />
      </div>
      </>
    // </asidecontext.Provider>
  )
}

export default App
