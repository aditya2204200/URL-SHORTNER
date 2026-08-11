import { useState } from "react";
import { loginUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(password, email);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* 
        NEW ENHANCED UI CARD:
        - Deep blur effect for realism.
        - Semi-transparent border for definition.
        - Soft inner glow/reflection.
      */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 transition-all duration-300 relative group overflow-hidden">
        {/* Subtle top inner glow reflection */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none" />

        <h2 className="text-4xl font-extrabold text-white text-center mb-10 tracking-tight z-10 relative">
          Login
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl text-sm font-medium z-10 relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="z-10 relative space-y-6">
          {/* Email Field with Better Context */}
          <div>
            <label
              className="block text-slate-200 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                className="block text-slate-200 text-sm font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              {/* Optional: Forgot Password link */}
              <a
                href="#"
                className="text-xs text-slate-400 hover:text-blue-400 font-medium"
              >
                Forgot?
              </a>
            </div>
            <input
              className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
              id="password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {/* Enhanced Submit Button with Internal Glow */}
          <button
            className={`w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center justify-center group-hover:shadow-blue-500/50 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Improved Register Redirect Link */}
        <div className="text-center mt-8 z-10 relative">
          <p className="text-sm text-slate-400 font-medium">
            Don't have an account?{" "}
            <span
              onClick={() => state(false)}
              className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer hover:underline transition-colors duration-150"
            >
              Get started for free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
