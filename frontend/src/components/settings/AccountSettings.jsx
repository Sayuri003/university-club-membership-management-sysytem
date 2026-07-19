function AccountSettings() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Account Information
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border rounded-xl p-3"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl duration-300">
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default AccountSettings;