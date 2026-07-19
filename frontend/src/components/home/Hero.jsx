function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center">

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}

        <div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            🎓 Welcome to UniClub
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-tight text-slate-900">
            Discover.
            <br />
            Join.
            <br />
            Lead Your
            <span className="text-blue-600"> University Clubs.</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-8">
            Join clubs, participate in exciting events,
            connect with students and build your future
            with one modern platform.
          </p>

          <div className="mt-10 flex gap-5">

            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 duration-300">
              Explore Clubs
            </button>

            <button className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-100 duration-300">
              Learn More
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700"
            alt="Students"
            className="rounded-3xl shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;