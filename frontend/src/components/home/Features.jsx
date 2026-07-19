import { FaUsers, FaCalendarAlt, FaAward } from "react-icons/fa";

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose UniClub?
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Everything you need to manage university clubs in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 duration-300">
            <FaUsers className="text-5xl text-blue-600 mb-6" />

            <h3 className="text-2xl font-bold mb-3">
              Club Membership
            </h3>

            <p className="text-gray-600">
              Join clubs easily and manage your memberships online.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 duration-300">
            <FaCalendarAlt className="text-5xl text-green-600 mb-6" />

            <h3 className="text-2xl font-bold mb-3">
              Event Management
            </h3>

            <p className="text-gray-600">
              Organize workshops, competitions and club activities.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 duration-300">
            <FaAward className="text-5xl text-purple-600 mb-6" />

            <h3 className="text-2xl font-bold mb-3">
              Leadership
            </h3>

            <p className="text-gray-600">
              Improve your leadership and teamwork through clubs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;