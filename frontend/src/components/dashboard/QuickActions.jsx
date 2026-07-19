import { FaPlus, FaUsers, FaCalendarAlt, FaBullhorn } from "react-icons/fa";

function QuickActions() {
  const actions = [
    {
      title: "Join Club",
      icon: <FaUsers />,
    },
    {
      title: "Create Event",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Post Notice",
      icon: <FaBullhorn />,
    },
    {
      title: "New Membership",
      icon: <FaPlus />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action, index) => (

          <button
            key={index}
            className="bg-blue-50 hover:bg-blue-600 hover:text-white duration-300 rounded-xl p-6 flex flex-col items-center gap-3"
          >

            <div className="text-3xl">
              {action.icon}
            </div>

            <span>{action.title}</span>

          </button>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;