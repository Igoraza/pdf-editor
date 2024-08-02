import { useState } from "react";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

export default function Navbar() {
    const Links = [
        { id: 1, title: "Merge PDF", path: "/merge" },
        { id: 2, title: "PDF to Excel", path: "/pdf-to-excel" },
        { id: 3, title: "PDF to Word", path: "/pdf-to-word" },
        { id: 4, title: "Compress PDF", path: "/compress-pdf" },
        { id: 5, title: "PDF to CSV", path: "/pdf-to-csv" },
        { id: 6, title: "Image to PDF", path: "/image-to-pdf" },
        { id: 7, title: "Encrypt PDF", path: "/encrypt" },
        { id: 8, title: "Add Watermark", path: "/watermark" },
        { id: 9, title: "Password Remover", path: "/password-remover" },
        { id: 10, title: "Word to PDF", path: "/word-to-pdf" }
    ];
    

    const [isOpen, setOpen] = useState(false)
    const handleCLick = () => setOpen(() => !isOpen)
    return (
        <nav className='navbar border-b lg:px-20 flex items-center justify-between z-50'>
            <Link to="/">
                <h3 className='text-2xl font-bold'>PDF<span className='text-green-500'>TOOL</span></h3>
            </Link>
            {/* ? menu */}
            {/* ! navbar menu for the desktop view */}
            <div className="hidden lg:block">
                <ul className="menu menu-horizontal px-1">

                    <li className="btn bg-green-500 hover:bg-green-600 text-white">
                        <a href="#all-tools">Features</a>
                    </li>
                    {/* {Links.map((data) => (
                        <li key={data.id}>
                            <Link to={data.path}>{data.title}</Link>
                        </li>
                    ))} */}
                </ul>
            </div>
            {/* ! menu for the mobile screen */}
            <div className="block lg:hidden">
                <button onClick={handleCLick} className='text-3xl'>
                    {isOpen ? <MdClose /> : <MdOutlineMenu />}
                </button>
                {/* ! display the menu list when user click on the hambuger */}
                {isOpen &&
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}

                        className="absolute shadow-lg mt-2 rounded-lg bg-gray-200 w-44 top-16 right-3 p-4 z-50">
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { opacity: 1, y: 0, transition: { delay: 0.2, staggerChildren: 0.1 } },
                                hidden: { opacity: 0, y: -10 }
                            }}
                            className="flex flex-col items-start space-y-4">
                            {Links.map((data) => (
                                <motion.li
                                    key={data.id}
                                    variants={{
                                        visible: { opacity: 1, y: 0 },
                                        hidden: { opacity: 0, y: -10 }
                                    }}
                                ><Link className="hover:text-green-400" href={data.path}>{data.title}</Link></motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                }
            </div>
        </nav>
    )
}