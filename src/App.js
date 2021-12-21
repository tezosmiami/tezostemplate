import React, {useState, useEffect, useContext} from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { useUserContext } from "./UserContext" 
import "./styles.css"

const unityContext = new UnityContext({
  loaderUrl: "build/tezRocks.loader.js",
  dataUrl: "build/tezRocks.data",
  frameworkUrl: "build/tezRocks.framework.js",
  codeUrl: "build/tezRocks.wasm",
});


function App() {

    const  app = useUserContext();
  return(
    <div>
      <div>
      <header>
      {app.activeAccount && app.address}
    <button onClick={() => !app.activeAccount ? app.logIn() : app.logOut()}> 
       
        {!app.activeAccount ? "sync" : "unsync"}</button></header>
        </div>
<body>   
    <Unity unityContext={unityContext}   style={{
        height: "auto",
        width: "90vw",
        aspectRatio: "4 / 3",
    
      }} />
</body>
    </div>)
}

export default App;
