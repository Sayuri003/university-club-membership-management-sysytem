import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaIdCard,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">

      <h2 className="text-3xl font-bold text-blue-400 mb-12">
        UniClub
      </h2>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/clubs"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaUsers />
          Clubs
        </Link>

        <Link
          to="/events"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaCalendarAlt />
          Events
        </Link>

        <Link
          to="/membership"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaIdCard />
          Membership
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaUserCircle />
          Profile
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaCog />
          Settings
        </Link>

        <hr className="border-slate-700 my-6" />

        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 w-full text-left">
          <FaSignOutAlt />
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;