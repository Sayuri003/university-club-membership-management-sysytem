import { FaCalendarAlt } from "react-icons/fa";

function NoticeCard({
  title,
  category,
  date,
  description,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl duration-300">

      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
        {category}
      </span>

      <h2 className="text-2xl font-bold mt-5">
        {title}
      </h2>

      <div className="flex items-center gap-2 mt-4 text-gray-500">

        <FaCalendarAlt />

        {date}

      </div>

      <p className="mt-5 text-gray-600">

        {description}

      </p>

      <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl duration-300">
        Read More
      </button>

    </div>
  );
}

export default NoticeCard;