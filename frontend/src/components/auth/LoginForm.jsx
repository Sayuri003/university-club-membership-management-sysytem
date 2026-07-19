import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  return (

    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

      <h2 className="text-4xl font-bold mb-3">
        Welcome Back
      </h2>

      <p className="text-gray-500 mb-8">
        Login to your UniClub account.
      </p>

      <form
  className="space-y-6"
  onSubmit={(e) => {
    e.preventDefault();
    navigate("/dashboard");
  }}
>

        <div>

          <label className="font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your university email"
            className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
          />

        </div>

        <div>

          <label className="font-medium">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="mt-2 w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-6"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        <div className="flex justify-between text-sm">

          <label className="flex gap-2">

            <input type="checkbox" />

            Remember Me

          </label>

          <a
            href="#"
            className="text-blue-600"
          >
            Forgot Password?
          </a>

        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 duration-300"
        >
          Login
        </button>

      </form>

      <p className="mt-8 text-center">

        Don't have an account?

        <Link
          to="/register"
          className="text-blue-600 ml-2 font-semibold"
        >
          Register
        </Link>

      </p>

    </div>

  );
}

export default LoginForm;