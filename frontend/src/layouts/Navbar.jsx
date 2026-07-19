import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-blue-600"
        >
          <FaUsers size={28} />
          UniClub
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">

          <Link to="/" className="hover:text-blue-600 duration-300">
            Home
          </Link>

          <Link to="/clubs" className="hover:text-blue-600 duration-300">
            Clubs
          </Link>

          <Link to="/events" className="hover:text-blue-600 duration-300">
            Events
          </Link>

          <Link to="/membership" className="hover:text-blue-600 duration-300">
            Membership
          </Link>

          <Link to="/notices" className="hover:text-blue-600 duration-300">
            Notices
          </Link>

        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-3">

          <Link
            to="/login"
            className="px-5 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 duration-300"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;