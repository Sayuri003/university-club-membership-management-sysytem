import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function EventSection() {
  const events = [
    {
      title: "AI Workshop 2025",
      date: "27 August 2025",
      location: "Main Auditorium",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Hackathon 2025",
      date: "28 August 2025",
      location: "Engineering Faculty",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Music Night",
      date: "30 August 2025",
      location: "University Ground",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Upcoming Events
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Don't miss exciting university events.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {events.map((event, index) => (

            <div
              key={index}
              className="rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 duration-300"
            >

              <div className={`bg-gradient-to-r ${event.color} p-8`}>

                <h3 className="text-3xl text-white font-bold">
                  {event.title}
                </h3>

              </div>

              <div className="p-8 bg-white">

                <div className="flex items-center gap-3 mb-4">

                  <FaCalendarAlt className="text-blue-600" />

                  <span>{event.date}</span>

                </div>

                <div className="flex items-center gap-3 mb-8">

                  <FaMapMarkerAlt className="text-red-500" />

                  <span>{event.location}</span>

                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 duration-300">
                  Register Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default EventSection;