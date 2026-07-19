import { useEffect, useState } from "react";

function LoadingScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center z-[9999]">

        <div className="text-center">

          <div className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>

          <h1 className="text-white text-5xl font-bold mt-8 tracking-wide">
            UniClub
          </h1>

          <p className="text-blue-100 mt-3 text-lg">
            Connecting Students...
          </p>

          <div className="w-64 h-2 bg-white/20 rounded-full mt-8 overflow-hidden">

            <div className="h-full bg-white animate-pulse w-full"></div>

          </div>

        </div>

      </div>
    );
  }

  return children;
}

export default LoadingScreen;