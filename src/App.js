import React, { useState, useEffect, useContext } from "react";
import { useUserContext } from "./UserContext";
import Unity, { UnityContext } from "react-unity-webgl";
import "./styles.css";

const unityContext = new UnityContext({
  loaderUrl: "build/tezRocks.loader.js",
  dataUrl: "build/tezRocks.data",
  frameworkUrl: "build/tezRocks.framework.js",
  codeUrl: "build/tezRocks.wasm",
});

function App() {

  const  app = useUserContext();
  
  return(
    <>
    <header>
      
      {app.activeAccount && app.address.substr(0, 5) + ". . ." + app.address.substr(-5)}
      
      <button onClick={() => !app.activeAccount ? app.logIn() : app.logOut()}> 
      {!app.activeAccount ? "sync" : "unsync"}
      </button>

    </header>   
    <div>
    <Unity unityContext={unityContext} style={{
        height: "auto",
        width: "90vw",
        aspectRatio: "4 / 3",
      }} />
    </div>
  
    </>
    )
}

export default App;
