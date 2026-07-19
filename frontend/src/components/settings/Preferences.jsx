function Preferences() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Preferences
      </h2>

      <div className="space-y-5">

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Email Notifications
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Event Reminders
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Dark Mode (Coming Soon)
        </label>

      </div>

    </div>
  );
}

export default Preferences;