import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home/Home"
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Pdf2Pic from './Pages/Pdf2Pic/Pdf2Pic'
export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pdf2pic' element={<Pdf2Pic />} />

      </Routes>
      <Footer/>
    </main>
  )
}
