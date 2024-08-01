import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home/Home"
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Pdf2Pic from './Pages/Pdf2Pic/Pdf2Pic'
import Convert from './Pages/Convert/Convert'
import PDFEditorComponent from './Pages/PDFEditorComponent/PDFEditorComponent'
import Encrypt from './Pages/Encrypt/Encrypt'
export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pdf2pic' element={<Pdf2Pic />} />
        <Route path='/pdf-to-word' element={<Convert title={"PDF to Word"} convertEndPoint={'/pdf/convert/word/'} fileType={["PDF"]}/>}/>
        <Route path='/word-to-pdf' element={<Convert title={"Word to PDF"} convertEndPoint={'/word/convert/pdf/'} fileType={["DOCX"]}/>}/>
        <Route path='/pdf-to-csv' element={<Convert title={"PDF to CSV"} convertEndPoint={'/pdf/convert/csv/'} fileType={["PDF"]}/>}/>
        <Route path='/pdf-to-excel' element={<Convert title={"PDF to Excel"} convertEndPoint={'/pdf/convert/csv/'} fileType={["PDF"]}/>}/>
        <Route path="/encrypt" element={<Encrypt/>}/>
        <Route path='/pdf-editor' element={<PDFEditorComponent/>}/>

      </Routes>
      <Footer/>
    </main>
  )
}
