import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ClubCard from "../../components/clubs/ClubCard";

const clubs = [
  {
    title: "Computer Society",
    description: "Coding, AI, Hackathons and technology events.",
    members: 250,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  },
  {
    title: "Robotics Club",
    description: "Build robots and participate in competitions.",
    members: 120,
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800",
  },
  {
    title: "Music Club",
    description: "Perform, practice and enjoy music together.",
    members: 180,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
  },
  {
    title: "Photography Club",
    description: "Photography workshops and campus photo walks.",
    members: 95,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  },
];

function Clubs() {
  return (
    <PageWrapper>
      <Navbar />

      <div className="pt-28 pb-16 bg-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center">
            University Clubs
          </h1>

          <p className="text-center text-gray-500 mt-4 mb-10">
            Explore student clubs and become a member.
          </p>

          <input
            type="text"
            placeholder="Search clubs..."
            className="w-full md:w-96 mx-auto block mb-10 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {clubs.map((club, index) => (
              <ClubCard key={index} {...club} />
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}

export default Clubs;