import { MdSearch } from "react-icons/md";
import { IoSparklesSharp } from "react-icons/io5";
export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center">
            <div className="relative mb-4">
            <div className="relative">
                <p className="absolute  flex items-center p-3 text-gray-500">
                    <MdSearch className="text-2xl " />
                </p>
                <input
                    type="text"
                    name="search tool"
                    className="focus:outline-none input bg-gray-200 pl-10 w-96 lg:w-82 rounded-full mb-2"
                    placeholder="  Search Tools ..." />
            </div>

            {/* ? svg sparkles icon */}
            <div className="absolute flex justify-end right-0 -top-12  lg:-top-16">
            <IoSparklesSharp className="text-green-500 ml-20 mt-6 text-4xl" />

            </div>

            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-center">Free <span className="text-green-500">Online PDF</span> and Document Tools</h2>
            <p className="mt-3 text-gray-500 text-center">Edit and convert PDF files online in your browser.</p>
            <p className="text-center text-gray-500">Please select your tool below:</p>
            <div className="mt-5 flex items-center justify-between">
                <IoSparklesSharp className="h-16 w-16 text-green-500 mr-44 lg:mr-96" />
                <ArrowSVG />
            </div>
        </section>
    )
}


const ArrowSVG = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 442.137"
            className="w-20 h-20 text-green-500 rotate-90" // Set width, height, and color using Tailwind CSS classes
        >
            <path d="M498.536 442.137c-31.387-25.229-67.042-47.435-83.064-62.714-5.282-5.036-11.007-12.153-1.664-8.574 25.872 9.909 54.004 27.667 75.003 49.744-2.547-18.498 2.366-41.616 9.997-60.504.939-2.328 3.886-11.918 7.547-15.089 1.358-1.177 2.819-1.472 4.307-.18.849.739 1.28 1.995 1.333 3.707.152 4.983-3.387 19.558-6.693 33.835-4.904 21.183-7.422 37.783-6.766 59.775z" fill="currentColor" />
            <path d="M243.828 236.348c4.322-22.157 5.797-44.278 4.95-66.742 45.792 16.983 86.744 47.759 120.988 82.094 41.377 41.487 75.893 91.781 100.677 142.434 7.709 15.756 12.142 22.106 22.781 36.215-19.821-95.783-137.213-251.196-246.698-274.194C232.218 29.162 103.055-53.717 0 40.704c95.353-64.986 210.522-25.748 234.658 113.48-11.685-1.414-23.233-1.219-34.515.824-26.693 4.83-52.462 12.782-72.736 38.719-28.125 35.979-26.324 94.975 19.286 115.587 54.862 24.792 87.927-25.739 97.135-72.966zm-7.016-67.487c.889 23.575-1.128 48.171-6.111 71.196-8.03 37.107-29.726 69.192-65.407 62.82-22.084-3.943-35.695-18.675-40.56-38.116-17.522-70.029 62.617-107.875 112.078-95.9z" fill="currentColor" />
        </svg>
    )
}
