import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import EventHero from "../../components/events/EventHero";
import EventFilter from "../../components/events/EventFilter";
import EventCard from "../../components/events/EventCard";
import FeaturedEvent from "../../components/events/FeaturedEvent";

const events = [
  {
    title: "AI Workshop",
    category: "Workshop",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    date: "15 Aug 2026",
    location: "Main Auditorium",
    participants: 150,
  },
  {
    title: "Hackathon 2026",
    category: "Competition",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    date: "22 Aug 2026",
    location: "Computer Lab",
    participants: 120,
  },
  {
    title: "Music Night",
    category: "Entertainment",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    date: "30 Aug 2026",
    location: "University Ground",
    participants: 300,
  },
  {
    title: "Career Fair",
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    date: "05 Sep 2026",
    location: "Conference Hall",
    participants: 450,
  },
  {
    title: "Sports Meet",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
    date: "12 Sep 2026",
    location: "University Stadium",
    participants: 500,
  },
  {
    title: "Photography Walk",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    date: "18 Sep 2026",
    location: "University Park",
    participants: 90,
  },
];

function Events() {
  return (
    <PageWrapper>
      <Navbar />

      <div className="bg-slate-100 min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          <EventHero />

          <EventFilter />
          <FeaturedEvent />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}

export default Events;