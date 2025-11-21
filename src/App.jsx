import Header from "./components/header"
import Home from "./components/Home"
import { useState } from "react";
import asidecontext from "./Context/useContext";
import Aside from "./components/Aside";
function App() {
 
  const [visible,setvisible]=useState(false);
  return (
    <asidecontext.Provider value={{visible:visible,setvisible}}>
      <Header />
      <div className="flex">
        {visible&&<Aside/>}
        <Home />
    </div>
    </asidecontext.Provider>
  )
}

export default App
