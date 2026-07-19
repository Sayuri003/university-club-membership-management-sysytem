import { FaCheckCircle } from "react-icons/fa";

function MembershipCard({
  title,
  price,
  features,
  popular,
}) {
  return (
    <div
      className={`relative rounded-3xl p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl
      ${
        popular
          ? "bg-blue-600 text-white"
          : "bg-white"
      }`}
    >

      {popular && (

        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">

          MOST POPULAR

        </span>

      )}

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <h3 className="text-5xl font-extrabold mt-6">
        {price}
      </h3>

      <div className="mt-8 space-y-4">

        {features.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-3"
          >

            <FaCheckCircle />

            {item}

          </div>

        ))}

      </div>

      <button
        className={`w-full mt-10 py-3 rounded-xl font-bold duration-300
        ${
          popular
            ? "bg-white text-blue-600 hover:bg-blue-100"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Choose Plan
      </button>

    </div>
  );
}

export default MembershipCard;