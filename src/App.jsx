import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home/Home"
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Pdf2Pic from './Pages/Pdf2Pic/Pdf2Pic'
import Convert from './Pages/Convert/Convert'
export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pdf2pic' element={<Pdf2Pic />} />
        <Route path='/pdf-to-word' element={<Convert/>}/>

      </Routes>
      <Footer/>
    </main>
  )
}
