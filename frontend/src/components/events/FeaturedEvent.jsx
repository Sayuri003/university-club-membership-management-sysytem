import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

function FeaturedEvent() {
  return (
    <div className="mt-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl overflow-hidden shadow-xl">

      <div className="grid lg:grid-cols-2 items-center">

        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
          alt="Featured Event"
          className="w-full h-full object-cover"
        />

        <div className="p-10 text-white">

          <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
            ⭐ FEATURED EVENT
          </span>

          <h2 className="text-4xl font-bold mt-6">
            AI & Innovation Summit 2026
          </h2>

          <p className="mt-4 text-blue-100">
            Join Sri Lanka's biggest university technology event with inspiring
            speakers, hands-on workshops and exciting competitions.
          </p>

          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">
              <FaCalendarAlt />
              25 August 2026
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt />
              Main Auditorium
            </div>

            <div className="flex items-center gap-3">
              <FaUsers />
              500+ Students
            </div>

          </div>

          <button className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-100 duration-300">
            Register Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default FeaturedEvent;