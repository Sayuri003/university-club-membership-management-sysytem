function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">

      <div className="max-w-5xl mx-auto text-center px-8">

        <h2 className="text-5xl font-bold text-white leading-tight">
          Ready to Join Your University Community?
        </h2>

        <p className="text-blue-100 text-xl mt-6">
          Discover clubs, attend exciting events, and grow your leadership
          skills with UniClub.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">

          <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:scale-105 duration-300 shadow-xl">
            Join Now
          </button>

          <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 duration-300">
            Explore Clubs
          </button>

        </div>

      </div>

    </section>
  );
}

export default CTASection;