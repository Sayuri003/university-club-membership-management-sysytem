import { FaStar } from "react-icons/fa";

function TestimonialSection() {
  const testimonials = [
    {
      name: "Kasun Perera",
      role: "Computer Society Member",
      review:
        "Joining the Computer Society helped me improve my programming skills and meet amazing friends.",
    },
    {
      name: "Nethmi Silva",
      role: "Music Club President",
      review:
        "Managing our club has become much easier with this platform. Everything is organized in one place.",
    },
    {
      name: "Dulaj Fernando",
      role: "Robotics Club",
      review:
        "The event management feature is fantastic. Registering members takes only a few clicks.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            What Students Say
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Hear from students using UniClub.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 duration-300"
            >

              <div className="flex text-yellow-400 text-xl mb-5">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 italic leading-7">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-bold">
                  {item.name}
                </h3>

                <p className="text-blue-600">
                  {item.role}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TestimonialSection;