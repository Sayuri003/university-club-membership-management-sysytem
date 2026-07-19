import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link
  to="/"
  className="flex items-center gap-3"
>

  <img
    src={logo}
    alt="UniClub Logo"
    className="w-11 h-11"
  />

  <div>

    <h1 className="text-2xl font-bold text-blue-600">
      UniClub
    </h1>

    <p className="text-xs text-gray-500">
      Club Management System
    </p>

  </div>

</Link>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/events">Events</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/notices">Notices</Link>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="border border-blue-600 px-4 py-2 rounded"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;