import { FaCrown } from "react-icons/fa";

function MembershipHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white p-12 shadow-xl">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

        <div>

          <div className="flex items-center gap-3">

            <FaCrown size={40} />

            <h1 className="text-5xl font-bold">
              Membership Plans
            </h1>

          </div>

          <p className="mt-6 text-xl text-blue-100 max-w-2xl">
            Become part of the university community.
            Join clubs, participate in events and unlock exclusive opportunities.
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">

          <h2 className="text-4xl font-bold">
            1050+
          </h2>

          <p className="mt-2">
            Active Members
          </p>

        </div>

      </div>

    </div>
  );
}

export default MembershipHero;