import { useState } from 'react'

import './App.css'
import { Outlet,useLocation,matchPath } from 'react-router-dom'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'

function App() {
 const location=useLocation();

 const hiddenHeaderRoutes=['/notes/:id']

//  const isHeaderHidden = hiddenHeaderRoutes.includes(location.pathname);

const isHeaderHidden = hiddenHeaderRoutes.some((pattern) =>
  matchPath(pattern, location.pathname)
);

  return (
    <>
     {!isHeaderHidden && <Header/>}
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
