import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { BiSolidFileJpg } from "react-icons/bi";
import { RiFileExcel2Fill, RiMergeCellsHorizontal } from "react-icons/ri";
import { AiFillFilePpt } from "react-icons/ai";
import { GiSplitArrows } from "react-icons/gi";
import { Card } from '../../Components/Card';

export default function EditorTool() {
  return (
    <section id="all-tools" className='px-4 lg:px-16 py-8'>
      <h3 className='text-3xl font-bold mb-4'>Editor <span className='text-green-500'>Tool</span></h3>
      <p className='text-gray-500 mb-6 max-w-xl'>
        Make use of our collection of PDF tools to process digital and streamline your workflow seamlessly.
      </p>
      <div className="flex flex-wrap gap-6 lg:px-20 md:px-20 justify-center">
        {editorToolText.map((data) => (
          <div key={data.link} className="flex flex-col items-center">
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
    link: "/merge"
  },
  {
    id: 2,
    icon: <RiFileExcel2Fill />,
    title: "PDF to Excel",
    bg: "bg-green-400",
    caption: "Convert PDFs to editable Excel spreadsheets",
    link: "/pdf-to-excel"
  },
  {
    id: 3,
    icon: <FaFileWord />,
    title: "PDF to Word",
    bg: "bg-purple-400",
    caption: "Convert PDFs to editable Word documents",
    link: "/pdf-to-word"
  },
  {
    id: 4,
    icon: <FaFilePdf />,
    title: "Compress PDF",
    bg: "bg-yellow-400",
    caption: "Compress your PDF files to reduce size",
    link: "/compress-pdf"
  },
  {
    id: 5,
    icon: <FaFilePdf />,
    title: "PDF to CSV",
    bg: "bg-teal-400",
    caption: "Convert PDFs to CSV format",
    link: "/pdf-to-csv"
  },
  {
    id: 6,
    icon: <BiSolidFileJpg />,
    title: "Image to PDF",
    bg: "bg-orange-400",
    caption: "Convert images (JPG, PNG, JPEG) to PDF format",
    link: "/image-to-pdf"
  },
  {
    id: 7,
    icon: <FaFilePdf />,
    title: "Encrypt PDF",
    bg: "bg-indigo-400",
    caption: "Encrypt your PDF files to secure them",
    link: "/encrypt"
  },
  {
    id: 8,
    icon: <FaFilePdf />,
    title: "Add Watermark",
    bg: "bg-gray-400",
    caption: "Add watermark to your PDF files",
    link: "/watermark"
  },
  {
    id: 9,
    icon: <FaFilePdf />,
    title: "Password Remover",
    bg: "bg-lime-400",
    caption: "Remove password from your PDF files",
    link: "/password-remover"
  },
  {
    id: 10,
    icon: <FaFilePdf />,
    title: "Word to PDF",
    bg: "bg-orange-400",
    caption: "Convert Word documents to PDF",
    link: "/word-to-pdf"
  },
];
