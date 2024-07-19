import { FaFilePdf,FaFileWord } from "react-icons/fa"
import { BiSolidFileJpg } from "react-icons/bi";
import { RiFileExcel2Fill } from "react-icons/ri";
import { AiFillFilePpt } from "react-icons/ai";
import { FaCode } from "react-icons/fa6";
import { MdTextFields } from "react-icons/md";
import { LuCombine } from "react-icons/lu";
import { FaFileCsv } from "react-icons/fa";

import { Card } from '../../Components/Card'
export default function ConverterTool() {
  return (
    <section className='px-4 lg:px-16 py-8'>
      <h3 className='text-3xl font-bold'>Converter <span className='text-green-500'>Tool</span></h3>
      <p className='text-gray-500 mt-2'>Our great PDF converted processes the following feature.Lets have a look.</p>
      <div className="flex flex-wrap justify-evenly gap-4 mt-4">
      {converterToolsText.map((data) => (
        <div key={data.id}>
          {/* {<data.icon/>} */}
          <Card content={data} />
        </div>
      ))}
      </div>
    </section>
  )
}


const converterToolsText = [
    {
        id:1,
        icon: <FaFilePdf/>,
        title: "Edit PDF",
        bg: "bg-red-400",
        caption: "Rotate and add text,images, and shape to a pdf",
        link: "/pdf-editor"
    },
    {
        id:2,
        icon: <BiSolidFileJpg/>,
        title: "JPG to PDF",
        bg: "bg-emerald-400",
        caption: "Transform JPG, PNG, BMP, GIF, and TIFF Images to PDF",
        link: "/"
    },
    {
        id:3,
        icon:  <BiSolidFileJpg/>,
        title: "PDF to JPG",
        bg: "bg-yellow-400",
        caption: "Extract Images from your PDF or save each pages as seperate images",
        link: "/pdf2pic"
    },
    {
        id:4,
        icon: <RiFileExcel2Fill/>,
        title: "Excel to PDF",
        bg: "bg-blue-400",
        caption: "Convert Excel spreadsheets to PDF documents",
        link: "/"
    },
    {
        id:5,
        icon: <RiFileExcel2Fill/>,
        title: "PDF to Excel",
        bg: "bg-green-400",
        caption: "Convert PDFs to editable Excel spreadsheets",
        link: "/"
    },
    {
        id:6,
        icon: <FaFileWord/>,
        title: "Word to PDF",
        bg: "bg-red-400",
        caption: "Make DOC and DOCX files easy to read by converting them to PDF",
        link: "/word-to-pdf"
    },
    {
        id:7,
        icon: <FaFileWord/>,
        title: "PDF to Word",
        bg: "bg-purple-400",
        caption: "Conver PDFs to editable Word documents",
        link: "/pdf-to-word"
    },
    {
        id:8,
        icon: <AiFillFilePpt/>,
        title: "PPT to PDF",
        bg: "bg-blue-400",
        caption: "Convert PowerPoint presentation to PDF documents",
        link: "/"
    },
    {
        id:9,
        icon: <AiFillFilePpt/>,
        title: "PDF to PPT",
        bg: "bg-emerald-400",
        caption: "Convert PDFs to editable PowerPoint presentation",
        link: "/"
    },
    {
        id:10,
        icon: <FaCode/>,
        title: "HTML to PDF",
        bg: "bg-green-400",
        caption: "Convert web pages and HTML files to PDF",
        link: "/"
    },
    {
        id:11,
        icon: <MdTextFields/>,
        title: "Text to PDF",
        bg: "bg-orange-400",
        caption: "You can simply convert Text to PDf file online",
        link: "/"
    },
    {
        id:12,
        icon: <MdTextFields/>,
        title: "PDF to Text",
        bg: "bg-purple-400",
        caption: "PDF to Text",
        link: "/"
    },
    {
        id:13,
        icon: <LuCombine/>,
        title: "Combine to PDF",
        bg: "bg-blue-400",
        caption: "Combine files in over 100 formats to PDF",
        link: "/"
    },
    {
        id:13,
        icon: <FaFileCsv/>,
        title: "PDF to CSV",
        bg: "bg-blue-400",
        caption: "PDF to CSV",
        link: "/pdf-to-csv"
    },
]