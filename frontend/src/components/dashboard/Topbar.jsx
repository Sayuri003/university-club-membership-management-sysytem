import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold">
          Student Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-6">

        <FaBell
          size={22}
          className="cursor-pointer text-gray-600"
        />

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={40}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold">
              John Doe
            </h3>

            <p className="text-sm text-gray-500">
              Student
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;