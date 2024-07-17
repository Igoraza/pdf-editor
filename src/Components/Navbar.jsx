import { useState } from "react";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

export default function Navbar() {
    const Links = [
        { id: 1, title: "Compress Image", path: "/" },
        { id: 2, title: "Compress PDF", path: "/" },
        { id: 3, title: "Merge PDF", path: "/" },
        { id: 4, title: "PDF Editor", path: "/" },
    ]

    const [isOpen, setOpen] = useState(false)
    const handleCLick = () => setOpen(() => !isOpen)
    return (
        <nav className='navbar border-b lg:px-20 flex items-center justify-between z-50'>
            <div>
                <h3 className='text-2xl font-bold'>PDF<span className='text-green-500'>TOOL</span></h3>
            </div>
            {/* ? menu */}
            {/* ! navbar menu for the desktop view */}
            <div className="hidden lg:block">
                <ul className="menu menu-horizontal px-1">

                    <li>
                        <details>
                            <summary>
                                All Tools
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                {Links.map((data) => (
                                    <li key={data.id}>
                                        <Link to={data.path}>{data.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                    {Links.map((data) => (
                        <li key={data.id}>
                            <Link to={data.path}>{data.title}</Link>
                        </li>
                    ))}
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