import {
  FaCheckCircle,
  FaUsers,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";

function RecentActivity() {
  const activities = [
    {
      icon: <FaUsers className="text-blue-600" />,
      text: "Joined Computer Society",
    },
    {
      icon: <FaCalendarAlt className="text-green-600" />,
      text: "Registered for Hackathon",
    },
    {
      icon: <FaCheckCircle className="text-purple-600" />,
      text: "Membership Approved",
    },
    {
      icon: <FaBell className="text-red-500" />,
      text: "New Notice Published",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Activities
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b pb-4 last:border-none"
          >
            <div className="text-2xl">
              {activity.icon}
            </div>

            <p>{activity.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;