import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round"
    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9C9C] pointer-events-none">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round"
    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9C9C] pointer-events-none">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const EyeIcon = ({ off }: { off?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="m3 3 18 18" />}
  </svg>
);

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from || "/mytasks";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-2 border-[#E6D5F5] bg-white rounded-xl pl-11 pr-4 py-3 text-[15px] sm:text-[16px] text-[#292929] outline-none transition placeholder:text-[#C4C4C4] hover:border-[#D3B5EB] focus:border-[#974FD0] focus:ring-4 focus:ring-purple-100";

  return (
    <div className="relative w-full min-h-[80vh] overflow-hidden py-10 px-4 sm:px-8 flex items-center justify-center bg-linear-to-b from-[#f9f1ff] via-white to-white">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#D3B5EB] bg-white/90 backdrop-blur shadow-xl shadow-purple-200/50">
        {/* Accent bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-purple-500 via-violet-500 to-slate-800" />

        <div className="p-6 sm:p-9">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">

            <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#2D0050]">
              Welcome back 👋
            </h1>
            <p className="mt-1.5 text-[#737171] text-[14px] sm:text-[16px]">
              Log in to pick up right where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-left text-[14px] sm:text-[15px] font-medium text-[#444] mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <MailIcon />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-left text-[14px] sm:text-[15px] font-medium text-[#444] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <LockIcon />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#9C9C9C] hover:text-[#974FD0] cursor-pointer transition-colors"
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="text-[13px] sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#974FD0] to-[#6B3399] hover:from-[#8844C0] hover:to-[#5A2A85] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[17px] sm:text-[18px] font-semibold py-3.5 rounded-xl shadow-md shadow-purple-300/50 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {submitting && (
                <span className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              )}
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="mt-7 text-center text-[14px] sm:text-[16px] text-[#737171]">
            New here?{" "}
            <Link
              to="/signup"
              className="text-[#974FD0] font-semibold hover:text-[#6B3399] hover:underline underline-offset-4"
            >
Sign Up            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;