import React, { useState, useEffect } from 'react'
import { useTezosContext } from './context/tezos-context';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Waffles } from './pages/Waffles'
import { Waffle } from './pages/Waffle'
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
  let location = useLocation()

  useEffect(() => {
    const favicon = document.getElementById("favicon")
    favicon.href = `/images/image${Math.floor(Math.random() * 12)}.png`
  }, [])
  
  return(
    <>
      <header style={{ height: `${useWindowWidth() < 550 ? '174px' : '144px'}`, 
                       alignItems: `${useWindowWidth() < 550 ? 'start' : 'center'}`,
                       marginTop: `${useWindowWidth() < 550 ? '11px' : '0px'}`   
                    }}>
         <div style={{alignItems: `${useWindowWidth() < 550 ? '' : 'flex-end'}`,
            marginTop: `${width < 550 ? '-6px' : '18px'}`,
            display: 'flex', flexDirection: `${width < 550 ? 'row' : 'column'}`,
            gap: '10px', width: `${width < 550 ? '100%' : '108px'}`}}>
        <button className='purple' onClick={() => !app.acc ? app.sync() : app.unsync() && setIsMint(false)}> 
          {!app.acc ? "sync" : "unsync"}
        </button>
        {app.address && <a href={`https://hicetnunc.miami/tz/${app.address}`}
        target="blank" rel="noopener noreferrer"> 
          {app.alias || app.address.substr(0, 5) + "..." + app.address.substr(-5)}
        </a>}
        <Link className='waffle' to={`${location.pathname === '/waffles' ? '/' : '/waffles'}`}>🧇</Link>&nbsp;&nbsp;
       </div>
      </header>  
      {isMint ? <Mint image={image} isMint= {isMint} setIsMint={setIsMint} /> :  <Sketch  image={image} setImage={setImage} setIsMint={setIsMint} width={width} />}
      <Routes>
        <Route path='/' element={<Waffles/>} />
        <Route path=":contract" >
          <Route path=":id" element={<Waffle/>} />
       </Route>
      </Routes>
    </>
    )
}

export default App;
