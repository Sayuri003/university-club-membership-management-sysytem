function MyClubs() {
  const clubs = [
    "Computer Society",
    "Robotics Club",
    "Photography Club",
    "Music Club",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        My Clubs
      </h2>

      <div className="space-y-4">

        {clubs.map((club, index) => (
          <div
            key={index}
            className="bg-slate-100 rounded-xl p-4 font-medium"
          >
            🏛️ {club}
          </div>
        ))}

      </div>

    </div>
  );
}

export default MyClubs;