import { FaBullhorn } from "react-icons/fa";

function NoticeHero() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl shadow-xl p-10 text-white">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

        <div>

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-5 rounded-full">

              <FaBullhorn size={35} />

            </div>

            <div>

              <h1 className="text-5xl font-bold">
                University Notices
              </h1>

              <p className="mt-2 text-blue-100">
                Stay updated with the latest announcements and university activities.
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

          <h2 className="text-5xl font-bold">
            24
          </h2>

          <p className="text-blue-100">
            Active Notices
          </p>

        </div>

      </div>

    </div>
  );
}

export default NoticeHero;