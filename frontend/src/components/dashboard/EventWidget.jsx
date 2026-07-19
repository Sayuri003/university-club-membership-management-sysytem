import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function EventWidget() {
  const events = [
    {
      title: "AI Workshop",
      date: "15 Aug 2025",
      location: "Main Auditorium",
    },
    {
      title: "Hackathon 2025",
      date: "22 Aug 2025",
      location: "Engineering Lab",
    },
    {
      title: "Music Night",
      date: "30 Aug 2025",
      location: "University Ground",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Upcoming Events
      </h2>

      <div className="space-y-5">
        {events.map((event, index) => (
          <div
            key={index}
            className="border-b pb-4 last:border-none"
          >
            <h3 className="font-semibold text-lg">
              {event.title}
            </h3>

            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <FaCalendarAlt />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <FaMapMarkerAlt />
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventWidget;