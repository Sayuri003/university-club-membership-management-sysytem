function Achievements() {
  const achievements = [
    "🥇 Best Volunteer",
    "🎖 Active Member",
    "🚀 Tech Leader",
    "🏆 Event Organizer",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-3xl font-bold mb-6">
        Achievements
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {achievements.map((item, index) => (
          <div
            key={index}
            className="bg-slate-100 rounded-xl p-4 font-medium"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Achievements;