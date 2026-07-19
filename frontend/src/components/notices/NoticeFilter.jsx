import { FaSearch } from "react-icons/fa";

function NoticeFilter() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-10">

      <div className="grid md:grid-cols-3 gap-4">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Notices..."
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">

          <option>All Categories</option>

          <option>Academic</option>

          <option>Events</option>

          <option>Sports</option>

          <option>Urgent</option>

        </select>

        <input
          type="date"
          className="border rounded-xl px-4 py-3"
        />

      </div>

    </div>
  );
}

export default NoticeFilter;