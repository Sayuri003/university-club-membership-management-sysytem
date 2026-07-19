import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

function EventCard({
  title,
  image,
  date,
  location,
  participants,
  category,
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300">

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
        />

        <span className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {category}
        </span>

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <div className="mt-5 space-y-3 text-gray-600">

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600" />
            {date}
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500" />
            {location}
          </div>

          <div className="flex items-center gap-3">
            <FaUsers className="text-green-600" />
            {participants} Participants
          </div>

        </div>

        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 duration-300"
        >
          Register
          <FaArrowRight />
        </button>

      </div>

    </div>
  );
}

export default EventCard;