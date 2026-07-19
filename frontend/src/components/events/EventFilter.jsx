import { FaSearch } from "react-icons/fa";

function EventFilter() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <div className="grid md:grid-cols-3 gap-4">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search events..."
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Categories</option>
          <option>Workshop</option>
          <option>Competition</option>
          <option>Seminar</option>
        </select>

        <input
          type="date"
          className="border rounded-xl px-4 py-3"
        />

      </div>

    </div>
  );
}

export default EventFilter;