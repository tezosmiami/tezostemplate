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
      <header>
    <button onClick={() => !app.activeAccount ? app.logIn() : app.logOut()}> 
        {!app.activeAccount ? "sync" :"unsync"}</button></header>
     
<body>   
    <Unity unityContext={unityContext}   style={{
        height: "640px",
        width: "960px",
        border: "2px solid black",
        background: "grey",
        objectFit:"contain"
      }} />
</body>
    </div>)
}

export default App;
