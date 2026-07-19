import {
  FaUsers,
  FaCalendarAlt,
  FaUniversity,
  FaBell,
} from "react-icons/fa";

// නිවැරදි Paths සහිතව Imports (දෙපාරක් පස්සට යා යුතුය: ../../)
import PageWrapper from "../../components/common/PageWrapper";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatCard from "../../components/dashboard/StatCard";
import EventWidget from "../../components/dashboard/EventWidget";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import ProfileSummary from "../../components/dashboard/ProfileSummary";

function Dashboard() {
  return (
    <PageWrapper>
      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />

        <div className="flex-1">

          <Topbar />

          <WelcomeCard />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <StatCard
              title="My Clubs"
              value="12"
              icon={<FaUniversity />}
              color="text-blue-600"
            />

            <StatCard
              title="Members"
              value="248"
              icon={<FaUsers />}
              color="text-green-600"
            />

            <StatCard
              title="Events"
              value="18"
              icon={<FaCalendarAlt />}
              color="text-orange-500"
            />

            <StatCard
              title="Notices"
              value="5"
              icon={<FaBell />}
              color="text-red-500"
            />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            <EventWidget />

            <RecentActivity />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            <QuickActions />

            <ProfileSummary />

          </div>

        </div>

      </div>
    </PageWrapper>
  );
}

export default Dashboard;