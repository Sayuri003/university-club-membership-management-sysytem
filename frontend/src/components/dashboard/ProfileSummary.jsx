import { FaUserGraduate } from "react-icons/fa";

function ProfileSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="profile"
        className="w-24 h-24 rounded-full mx-auto"
      />

      <h2 className="text-2xl font-bold mt-4">
        John Doe
      </h2>

      <p className="text-gray-500">
        Computer Science Student
      </p>

      <div className="mt-6 flex justify-center">
        <FaUserGraduate className="text-5xl text-blue-600" />
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700 duration-300">
        View Profile
      </button>

    </div>
  );
}

export default ProfileSummary;