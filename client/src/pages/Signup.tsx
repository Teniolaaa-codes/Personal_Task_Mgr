import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const iconClass =
  "absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9C9C] pointer-events-none";

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
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

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password) {
      setError("Name, email, and password are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    try {
      await signup(name.trim(), email.trim(), password);
      navigate("/mytasks", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-2 border-[#E6D5F5] bg-white rounded-xl pl-11 pr-4 py-3 text-[15px] sm:text-[16px] text-[#292929] outline-none transition placeholder:text-[#C4C4C4] hover:border-[#D3B5EB] focus:border-[#974FD0] focus:ring-4 focus:ring-purple-100";
  const labelClass =
    "block text-left text-[14px] sm:text-[15px] font-medium text-[#444] mb-1.5";

  return (
    <div className="relative w-full min-h-[80vh] overflow-hidden py-10 px-4 sm:px-8 flex items-center justify-center bg-linear-to-b from-[#f9f1ff] via-white to-white">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#D3B5EB] bg-white/90 backdrop-blur shadow-xl shadow-purple-200/50">
        {/* Accent bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-purple-500 via-violet-500 to-slate-800" />

        <div className="p-6 sm:p-9">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#2D0050]">
              TaskMgr ✨
            </h1>
            <p className="mt-1.5 text-[#737171] text-[14px] sm:text-[16px]">
              Sign Up and start organizing your tasks in minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <div className="relative">
                <UserIcon />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
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
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <LockIcon />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                  placeholder="At least 6 characters"
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
              <p
                className={`mt-1.5 text-left text-[12px] sm:text-[13px] transition-colors ${
                  password.length >= 6 ? "text-green-600" : "text-[#9C9C9C]"
                }`}
              >
                {password.length >= 6
                  ? "✓ Looks good"
                  : "Use at least 6 characters"}
              </p>
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
              {submitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-7 text-center text-[14px] sm:text-[16px] text-[#737171]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#974FD0] font-semibold hover:text-[#6B3399] hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;