import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import ProfileHero from "../../components/profile/ProfileHero";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileInfo from "../../components/profile/ProfileInfo";
import MyClubs from "../../components/profile/MyClubs";
import UpcomingEvents from "../../components/profile/UpcomingEvents";
import Achievements from "../../components/profile/Achievements";

function Profile() {
  return (
    <PageWrapper>
      <Navbar />

      <div className="bg-slate-100 min-h-screen pt-28 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <ProfileHero />

          <ProfileStats />

          <ProfileInfo />

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <MyClubs />

            <UpcomingEvents />

          </div>

          <Achievements />

        </div>

      </div>

      <Footer />
    </PageWrapper>
  );
}

export default Profile;