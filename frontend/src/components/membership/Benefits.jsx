import {
  FaUsers,
  FaCertificate,
  FaLaptopCode,
  FaRocket,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaUsers size={35} />,
    title: "Networking",
    description: "Meet students from different faculties."
  },
  {
    icon: <FaCertificate size={35} />,
    title: "Certificates",
    description: "Earn certificates through club activities."
  },
  {
    icon: <FaLaptopCode size={35} />,
    title: "Skill Development",
    description: "Improve leadership and technical skills."
  },
  {
    icon: <FaRocket size={35} />,
    title: "Career Growth",
    description: "Build experience for your future career."
  },
];

function Benefits() {
  return (
    <div className="mt-20">

      <h2 className="text-4xl font-bold text-center">
        Why Join UniClub?
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

        {benefits.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300"
          >

            <div className="text-blue-600 flex justify-center">

              {item.icon}

            </div>

            <h3 className="text-2xl font-bold mt-5">

              {item.title}

            </h3>

            <p className="mt-3 text-gray-500">

              {item.description}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Benefits;