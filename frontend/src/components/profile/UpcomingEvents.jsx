function UpcomingEvents() {
  const events = [
    "AI Workshop",
    "Hackathon 2026",
    "Music Night",
    "Career Fair",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        Upcoming Events
      </h2>

      <div className="space-y-4">

        {events.map((event, index) => (
          <div
            key={index}
            className="bg-slate-100 rounded-xl p-4 font-medium"
          >
            📅 {event}
          </div>
        ))}

      </div>

    </div>
  );
}

export default UpcomingEvents;