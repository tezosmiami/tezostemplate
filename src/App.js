import React, { useState, useEffect } from 'react'
import { useTezosContext } from './context/tezos-context';
import { Mint } from './components/mint'
import Sketch from "./components/sketch";
import "./styles.css";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(0)
  
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => { 
      window.removeEventListener("resize", handleResize)
    }
  }, [setWidth])
  
  return width
}

function App() {
  const [image, setImage] = useState(null)
  const [isMint, setIsMint] = useState(false)
  const app = useTezosContext()
  let width = useWindowWidth()
  
  return(
    <>
      <header style={{ height: `${useWindowWidth() < 600 ? '174px' : '144px'}`, 
                       alignItems: `${useWindowWidth() < 600 ? 'start' : 'center'}`,
                       marginTop: `${useWindowWidth() < 600 ? '11px' : '0px'}`   
                    }}>
        {app.address && <a href={`https://hicetnunc.miami/tz/${app.address}`}
        target="blank" rel="noopener noreferrer"> 
          {app.alias || app.address.substr(0, 5) + "..." + app.address.substr(-5)}
        </a>}
        &nbsp;
        <button className='purple' onClick={() => !app.acc ? app.sync() : app.unsync() && setIsMint(false)}> 
          {!app.acc ? "sync" : "unsync"}
        </button>
      </header>  
      {isMint ? <Mint image={image} isMint= {isMint} setIsMint={setIsMint} /> :  <Sketch  image={image} setImage={setImage} setIsMint={setIsMint} width={width} />}
  
    </>
    )
}

export default App;
