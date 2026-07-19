function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT */}

      <div className="hidden lg:flex bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white items-center justify-center">

        <div className="text-center px-10">

          <h1 className="text-6xl font-bold">
            UniClub
          </h1>

          <p className="mt-8 text-2xl">
            Connect • Participate • Lead
          </p>

          <div className="mt-16 text-8xl">
            🎓
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center justify-center bg-slate-100">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;