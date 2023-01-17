import React from "react"
import { useTezosContext } from "./context/tezos-context"
import { Link, Routes, Route } from "react-router-dom"
import { About } from './pages/About'
import { Home } from './pages/Home'
import "./styles.css"


function App() {

  const  app = useTezosContext()
  
  return(
    <>
      <header>
        {app.address && <a href={`https://hicetnunc.miami/tz/${app.address}`}
        target="blank" rel="noopener noreferrer"> 
          {app.alias || app.address.substr(0, 5) + "..." + app.address.substr(-5)}
        </a>}
        <Link className='purple' to="/about">about</Link>
        <Link className='purple' to="/">/</Link>
        <button onClick={() => !app.activeAccount ? app.sync() : app.unSync()}> 
          {!app.acc ? "sync" : "unsync"}
        </button>
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
