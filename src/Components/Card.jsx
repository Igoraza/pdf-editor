import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

export const Card = ({ content }) => {
  return (
    <Link to={content.link} className={`card bg-fixed hover:bg-green-200 bg-base-100 w-96 h-60 group border  hover:shadow-xl transition duration-300`}>
      <div className="card-body">
        <div className="flex items-center justify-between p-2">
          <div className={`flex items-center justify-center ${content.bg} p-3 text-2xl text-white rounded-lg`}>
            {content.icon}
          </div>
          <Link to={content.link}>
            <MdArrowOutward className="text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-300" />
          </Link>
        </div>
        <h3 className="font-bold mt-4 mb-2 text-xl card-title">{content.title}</h3>
        <p className="text-gray-700">{content.caption}</p>
      </div>
    </Link>
  );
};
