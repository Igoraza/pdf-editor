import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { BiSolidFileJpg } from "react-icons/bi";
import { RiFileExcel2Fill, RiMergeCellsHorizontal } from "react-icons/ri";
import { AiFillFilePpt } from "react-icons/ai";
import { GiSplitArrows } from "react-icons/gi";
import { Card } from '../../Components/Card';

export default function EditorTool() {
  return (
    <section className='px-4 lg:px-16 py-8'>
      <h3 className='text-3xl font-bold mb-4'>Editor <span className='text-green-500'>Tool</span></h3>
      <p className='text-gray-500 mb-6 max-w-xl'>
        Make use of our collection of PDF tools to process digital and streamline your workflow seamlessly
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {editorToolText.map((data) => (
          <div key={data.id} className="flex flex-col items-center">
            <Card content={data} />
          </div>
        ))}
      </div>
    </section>
  );
}

const editorToolText = [
  {
    id: 1,
    icon: <RiMergeCellsHorizontal />,
    title: "Merge PDF",
    bg: "bg-blue-400",
    caption: "Merge multiple files into a single PDF easily",
    link: "/"
  },
  {
    id: 2,
    icon: <GiSplitArrows />,
    title: "Split PDF",
    bg: "bg-emerald-400",
    caption: "Transform JPG, PNG, BMP, GIF, and TIFF Images to PDF",
    link: "/"
  },
  {
    id: 3,
    icon: <BiSolidFileJpg />,
    title: "PDF to JPG",
    bg: "bg-yellow-400",
    caption: "Extract Images from your PDF or save each page as separate images",
    link: "/"
  },
  {
    id: 4,
    icon: <RiFileExcel2Fill />,
    title: "Excel to PDF",
    bg: "bg-blue-400",
    caption: "Convert Excel spreadsheets to PDF documents",
    link: "/"
  },
  {
    id: 5,
    icon: <RiFileExcel2Fill />,
    title: "PDF to Excel",
    bg: "bg-green-400",
    caption: "Convert PDFs to editable Excel spreadsheets",
    link: "/pdf-to-excel"
  },
  {
    id: 6,
    icon: <FaFileWord />,
    title: "Word to PDF",
    bg: "bg-red-400",
    caption: "Make DOC and DOCX files easy to read by converting them to PDF",
    link: "/"
  },
  {
    id: 7,
    icon: <FaFileWord />,
    title: "PDF to Word",
    bg: "bg-purple-400",
    caption: "Convert PDFs to editable Word documents",
    link: "/"
  },
  {
    id: 8,
    icon: <AiFillFilePpt />,
    title: "PPT to PDF",
    bg: "bg-blue-400",
    caption: "Convert PowerPoint presentation to PDF documents",
    link: "/"
  },
  {
    id: 9,
    icon: <AiFillFilePpt />,
    title: "PDF to PPT",
    bg: "bg-emerald-400",
    caption: "Convert PDFs to editable PowerPoint presentation",
    link: "/"
  }
];
