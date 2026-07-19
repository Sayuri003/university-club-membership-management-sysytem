function SecuritySettings() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Security
      </h2>

      <div className="space-y-5">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-xl p-3"
        />

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl duration-300">
          Update Password
        </button>

      </div>

    </div>
  );
}

export default SecuritySettings;