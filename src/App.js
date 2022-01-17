import React from "react";
import { useUserContext } from "./context/user-context";
import Unity, { UnityContext } from "react-unity-webgl";
import { Link, Routes, Route } from "react-router-dom";
import { About } from './pages/About'
import { Home } from './pages/Home'
import "./styles.css";

const unityContext = new UnityContext({
  loaderUrl: "build/tezRockz.loader.js",
  dataUrl: "build/tezRockz.data",
  frameworkUrl: "build/tezRockz.framework.js",
  codeUrl: "build/tezRockz.wasm",
});


function App() {

  const  app = useUserContext();
  
  return(
    <>
    <header>
      {app.address && <a href={`https://hicetnunc.miami/tz/${app.address}`}
      target="blank" rel="noopener noreferrer"> 
        {app.name || app.address.substr(0, 5) + "..." + app.address.substr(-5)}
      </a>}
      <Link className='purple' to="/about">about</Link>
      <Link className='purple' to="/">/</Link>
      <button onClick={() => !app.activeAccount ? app.logIn() : app.logOut()}> 
        {!app.activeAccount ? "sync" : "unsync"}
      </button>

      {app.activeAccount && unityContext.send("WalletLoader", "GetWallet", app.address)}

    <div>
    <Unity unityContext={unityContext} style={{
        height: "auto",
        width: "90vw",
        aspectRatio: "4 / 3",
      }} />
    </div>
  

    </header>      
     <div>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
    
    </>
    )
}

export default App;
