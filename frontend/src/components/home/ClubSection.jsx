import {
  FaLaptopCode,
  FaRobot,
  FaCamera,
  FaMusic,
  FaFutbol,
  FaTheaterMasks,
} from "react-icons/fa";

function ClubSection() {

  const clubs = [
    {
      icon: <FaLaptopCode />,
      name: "Computer Society",
      members: "220 Members",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaRobot />,
      name: "Robotics Club",
      members: "145 Members",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <FaCamera />,
      name: "Photography Club",
      members: "90 Members",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: <FaMusic />,
      name: "Music Club",
      members: "120 Members",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaFutbol />,
      name: "Sports Club",
      members: "310 Members",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <FaTheaterMasks />,
      name: "Drama Club",
      members: "85 Members",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            Featured Clubs
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Discover student communities that match your passion.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {clubs.map((club, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-3 duration-300"
            >

              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 ${club.color}`}>
                {club.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {club.name}
              </h3>

              <p className="text-gray-500 mb-6">
                {club.members}
              </p>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl duration-300">
                View Club
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ClubSection;