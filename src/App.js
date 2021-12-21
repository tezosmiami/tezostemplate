import React, { useState, useEffect, useContext } from "react";
import { useUserContext } from "./UserContext";
import "./styles.css";


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

    </div>
    
    </>
    )
}

export default App;
