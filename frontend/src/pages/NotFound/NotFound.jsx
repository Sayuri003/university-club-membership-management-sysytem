import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100">

      <h1 className="text-8xl font-bold text-blue-600">
        404
      </h1>

      <p className="text-2xl mt-4">
        Oops! Page Not Found
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 duration-300"
      >
        Back Home
      </Link>

    </div>
  );
}

export default NotFound;