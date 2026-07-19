import { FaUserCircle } from "react-icons/fa";

function ProfileHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 shadow-xl text-white">

      <div className="flex flex-col md:flex-row items-center justify-between">

        <div className="flex items-center gap-6">

          <FaUserCircle size={120} />

          <div>

            <h1 className="text-4xl font-bold">
              John Doe
            </h1>

            <p className="text-blue-100 mt-2">
              BSc Computer Science Undergraduate
            </p>

            <p className="text-blue-200 mt-1">
              Member Since 2026
            </p>

          </div>

        </div>

        <button className="mt-8 md:mt-0 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-100 duration-300">
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default ProfileHero;