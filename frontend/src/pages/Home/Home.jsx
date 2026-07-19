import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Stats from "../../components/home/Stats";
import ClubSection from "../../components/home/ClubSection";
import EventSection from "../../components/home/EventSection";
import TestimonialSection from "../../components/home/TestimonialSection";
import CTASection from "../../components/home/CTASection";
import PageWrapper from "../../components/common/PageWrapper";

function Home() {
  return (
    <PageWrapper>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="text-center">

          <h1 className="text-6xl font-bold mb-6">
            University Club
            <span className="text-blue-600"> Management System</span>
          </h1>

          <p className="text-gray-600 text-xl mb-8">
            Join Clubs, Manage Events, Build Your University Community.
          </p>

          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 duration-300">
            Explore Clubs
          </button>

        </div>

      </section>

      <Footer />
      <Hero />
      <Features />
      <Stats />
      <ClubSection />
      <EventSection />
      <TestimonialSection />
      <CTASection />
      
    </PageWrapper>
    
  );
}

export default Home;