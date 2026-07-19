import { FaCog } from "react-icons/fa";

function SettingsHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">

      <div className="flex items-center gap-5">

        <div className="bg-white/20 p-5 rounded-full">
          <FaCog size={35} />
        </div>

        <div>

          <h1 className="text-5xl font-bold">
            Settings
          </h1>

          <p className="text-blue-100 mt-2">
            Manage your account preferences and security.
          </p>

        </div>

      </div>

    </div>
  );
}

export default SettingsHero;