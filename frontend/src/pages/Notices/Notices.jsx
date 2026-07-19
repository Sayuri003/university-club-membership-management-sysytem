import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import NoticeHero from "../../components/notices/NoticeHero";
import NoticeStats from "../../components/notices/NoticeStats";
import NoticeFilter from "../../components/notices/NoticeFilter";
import NoticeCard from "../../components/notices/NoticeCard";

const notices = [
  {
    title: "New Club Registration",
    category: "Academic",
    date: "15 July 2026",
    description:
      "Registration for new university clubs is now open. Submit your applications before the deadline.",
  },
  {
    title: "Annual Sports Meet",
    category: "Sports",
    date: "18 July 2026",
    description:
      "The annual inter-faculty sports meet will be held next month. Register your team today.",
  },
  {
    title: "AI Workshop",
    category: "Events",
    date: "22 July 2026",
    description:
      "Join our AI Workshop conducted by industry experts. Limited seats available.",
  },
  {
    title: "Library Maintenance",
    category: "Urgent",
    date: "25 July 2026",
    description:
      "The university library will remain closed due to scheduled maintenance work.",
  },
  {
    title: "Photography Competition",
    category: "Competition",
    date: "28 July 2026",
    description:
      "Capture the beauty of the university campus and win exciting prizes.",
  },
  {
    title: "Volunteer Program",
    category: "Community",
    date: "30 July 2026",
    description:
      "Become a volunteer and contribute to upcoming university community projects.",
  },
];

function Notices() {
  return (
    <PageWrapper>
      <Navbar />

      <div className="bg-slate-100 min-h-screen pt-28 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <NoticeHero />

          <NoticeStats />

          <NoticeFilter />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

            {notices.map((notice, index) => (
              <NoticeCard
                key={index}
                title={notice.title}
                category={notice.category}
                date={notice.date}
                description={notice.description}
              />
            ))}

          </div>

        </div>

      </div>

      <Footer />

    </PageWrapper>
  );
}

export default Notices;