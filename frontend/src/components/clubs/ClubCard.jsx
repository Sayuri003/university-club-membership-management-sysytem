function ClubCard({ image, title, description, members }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-gray-500 mt-3">
          {description}
        </p>

        <p className="mt-4 font-semibold text-blue-600">
          👥 {members} Members
        </p>

        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 duration-300">
          Join Club
        </button>

      </div>
    </div>
  );
}

export default ClubCard;