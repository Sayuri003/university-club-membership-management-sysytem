import { FaUsers, FaUniversity, FaCalendarCheck, FaTrophy } from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaUsers className="text-5xl text-blue-600" />,
      number: "1,250+",
      title: "Active Members",
    },
    {
      icon: <FaUniversity className="text-5xl text-green-600" />,
      number: "35",
      title: "University Clubs",
    },
    {
      icon: <FaCalendarCheck className="text-5xl text-purple-600" />,
      number: "150+",
      title: "Events Conducted",
    },
    {
      icon: <FaTrophy className="text-5xl text-orange-500" />,
      number: "50+",
      title: "Awards Won",
    },
  ];

  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Our Community in Numbers
          </h2>

          <p className="text-gray-300 mt-4 text-lg">
            Building a stronger university community every year.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-3xl p-8 text-center hover:scale-105 duration-300 shadow-xl"
            >
              <div className="flex justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-5xl font-bold text-white mb-3">
                {item.number}
              </h3>

              <p className="text-gray-300">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;