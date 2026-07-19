import { FaCalendarAlt } from "react-icons/fa";

function EventHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white p-10 shadow-xl">

      <div className="flex items-center gap-4">

        <div className="bg-white/20 p-5 rounded-full">
          <FaCalendarAlt size={40} />
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            Upcoming Events
          </h1>

          <p className="text-blue-100 mt-2">
            Discover exciting workshops, competitions and university activities.
          </p>

        </div>

      </div>

    </div>
  );
}

export default EventHero;