import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import MembershipHero from "../../components/membership/MembershipHero";
import MembershipCard from "../../components/membership/MembershipCard";
import Benefits from "../../components/membership/Benefits";

const plans = [
  {
    title: "Student",
    price: "FREE",
    popular: false,
    features: [
      "Join Clubs",
      "Access Events",
      "Receive Notices",
      "Basic Support",
    ],
  },
  {
    title: "Premium",
    price: "Rs. 500",
    popular: true,
    features: [
      "Everything in Student",
      "Priority Registration",
      "Exclusive Workshops",
      "Certificates",
    ],
  },
  {
    title: "Executive",
    price: "Rs. 1000",
    popular: false,
    features: [
      "Everything in Premium",
      "Leadership Opportunities",
      "VIP Events",
      "Special Recognition",
    ],
  },
];

function Membership() {
  return (
    <PageWrapper>
      <Navbar />

      <div className="bg-slate-100 min-h-screen pt-28 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <MembershipHero />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">

            {plans.map((plan, index) => (
              <MembershipCard key={index} {...plan} />
            ))}

          </div>

          <Benefits />

        </div>

      </div>

      <Footer />
    </PageWrapper>
  );
}

export default Membership;