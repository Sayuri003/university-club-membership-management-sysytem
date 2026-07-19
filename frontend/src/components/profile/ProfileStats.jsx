import {
  FaUsers,
  FaCalendarAlt,
  FaAward,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    title: "My Clubs",
    value: "12",
    icon: <FaUsers size={28} />,
  },
  {
    title: "Events",
    value: "18",
    icon: <FaCalendarAlt size={28} />,
  },
  {
    title: "Certificates",
    value: "5",
    icon: <FaAward size={28} />,
  },
  {
    title: "Points",
    value: "248",
    icon: <FaStar size={28} />,
  },
];

function ProfileStats() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

      {stats.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg p-6 text-center hover:-translate-y-2 hover:shadow-2xl duration-300"
        >

          <div className="text-blue-600 flex justify-center">
            {item.icon}
          </div>

          <h2 className="text-4xl font-bold mt-4">
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

export default ProfileStats;