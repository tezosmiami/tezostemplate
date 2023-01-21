import React, { useState, useEffect } from 'react'
import { useTezosContext } from './context/tezos-context';
import { Mint } from './components/mint'
import Sketch from "./components/sketch";
import "./styles.css";


function App() {
  const [image, setImage] = useState(null)
  const [isMint, setIsMint] = useState(false)
  const app = useTezosContext()
  return(
    <>
      <header>
        {app.address && <a href={`https://hicetnunc.miami/tz/${app.address}`}
        target="blank" rel="noopener noreferrer"> 
          {app.alias || app.address.substr(0, 5) + "..." + app.address.substr(-5)}
        </a>}
        &nbsp;
        <button className='purple' onClick={() => !app.acc ? app.sync() : app.unsync() && setIsMint(false)}> 
          {!app.acc ? "sync" : "unsync"}
        </button>
      </header>  
      {isMint ? <Mint image={image} isMint= {isMint} setIsMint={setIsMint} /> :  <Sketch  image={image} setImage={setImage} setIsMint={setIsMint} />}
  
    </>
    )
}

export default App;
