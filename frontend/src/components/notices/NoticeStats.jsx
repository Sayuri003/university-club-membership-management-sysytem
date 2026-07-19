import {
  FaBook,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaBook size={28} />,
    title: "Academic",
    value: "10",
  },
  {
    icon: <FaCalendarAlt size={28} />,
    title: "Events",
    value: "8",
  },
  {
    icon: <FaExclamationTriangle size={28} />,
    title: "Urgent",
    value: "6",
  },
  {
    icon: <FaUsers size={28} />,
    title: "Club News",
    value: "15",
  },
];

function NoticeStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

      {stats.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg p-6 text-center hover:-translate-y-2 hover:shadow-2xl duration-300"
        >

          <div className="text-blue-600 flex justify-center">

            {item.icon}

          </div>

          <h2 className="text-3xl font-bold mt-4">

            {item.value}

          </h2>

          <p className="text-gray-500 mt-2">

            {item.title}

          </p>

        </div>

      ))}

    </div>
  );
}

export default NoticeStats;