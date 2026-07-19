import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import SettingsHero from "../../components/settings/SettingsHero";
import AccountSettings from "../../components/settings/AccountSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import Preferences from "../../components/settings/Preferences";

function Settings() {
  return (
    <PageWrapper>
      <Navbar />

      <div className="bg-slate-100 min-h-screen pt-28 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <SettingsHero />

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <AccountSettings />

            <SecuritySettings />

          </div>

          <div className="mt-8">

            <Preferences />

          </div>

        </div>

      </div>

      <Footer />
    </PageWrapper>
  );
}

export default Settings;