import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Profile from "../assets/profile.jpg";
import { useAuth } from "../context/authContext";

const linkClass =
  "text-[12px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-medium text-[#292929] hover:text-[#974FD0] transition-colors";

const NavBar: React.FC = () => {
  const location = useLocation();
  const { user, token, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when navigating to another page
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  const allLinks = () => {
    const { pathname } = location;
    const home = (
      <NavLink to="/">
        <h3 className={linkClass}>Home</h3>
      </NavLink>
    );
    const newTask = (
      <NavLink to="/newtask">
        <h3 className={linkClass}>New Task</h3>
      </NavLink>
    );
    const allTasks = (
      <NavLink to="/mytasks">
        <h3 className={linkClass}>All Task</h3>
      </NavLink>
    );

    if (pathname === "/") {
      return (
        <>
          {home}
          {newTask}
          {allTasks}
        </>
      );
    }
    if (pathname === "/mytasks") {
      return (
        <>
          {home}
          {newTask}
        </>
      );
    }
    if (pathname.startsWith("/edittask")) {
      return (
        <>
          {home}
          {newTask}
          {allTasks}
        </>
      );
    }
    if (pathname === "/newtask") {
      return (
        <>
          {home}
          {allTasks}
        </>
      );
    }
    return null;
  };

  return (
    <nav className="w-full border-b-3 border-[#D3B5EB] mx-auto px-5 sm:px-8 md:px-16 lg:px-42.5 py-2 md:py-3 flex items-center justify-between rounded-b-2xl gap-3 sm:gap-0 ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="w-7.5 md:w-[39.91px] h-7.5 md:h-[39.91px] rounded-r-full bg-linear-to-bl from-purple-500 via-violet-500 to-slate-800 shadow-lg ">
          <h1 className="text-[35px] md:text-[47.49px] font-normal absolute z-20 top-0.75 sm:top-1.75 md:top-1.5 lg:top-3 md:left-17.5 left-6.25 sm:left-9.5 lg:left-44.5 text-[#FAF9FB] font-[Secular_One] ">
            T
          </h1>
        </div>

        <h3 className="font-semibold text-[16px] sm:text-[20px] lg:text-[27.37px] text-[#2D0050] ">
          TaskMgr.
        </h3>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-2 sm:gap-6">
        {token ? (
          <>
            {" "}
            {allLinks()}
            {/* Profile + avatar dropdown */}
            <div className="relative cursor-pointer" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Open user menu"
                className="relative block cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#974FD0]"
              >
                <img
                  src={Profile}
                  alt=""
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-15 lg:w-15 border-[3px] sm:border-[5px] border-[#292929] rounded-full object-cover"
                />
                <span className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-[#974FD0] absolute top-0.5 sm:top-0.75 sm:h-2.5 sm:w-2.5  right-0.5 md:top-1 md:right-1 animate-pulse " />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-52 sm:w-60 bg-[#f9f1ff] border-2 border-[#D3B5EB] rounded-[10px] shadow-lg p-4 z-50 flex flex-col gap-3"
                >
                  <div className="min-w-0">
                                        <p className="text-[11px] sm:text-[14px] text-[#737171]">Hi!👋</p>
                    <p className="text-[14px] sm:text-[16px] font-semibold text-[#2D0050] truncate">
                      {user?.name || user?.email}
                    </p>
                    {user?.name && user?.email && (
                      <p className="text-[12px] sm:text-[13px] text-[#737171] truncate">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full text-[14px] sm:text-[16px] font-medium text-[#974FD0] hover:text-[#6B3399] border-t border-[#D3B5EB] pt-3 cursor-pointer text-center"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <h3 className="text-[14px] sm:text-[18px] lg:text-[20px] font-medium text-[#292929] hover:text-[#974FD0] transition-colors">
                Log in
              </h3>
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-[#974FD0] hover:bg-[#6B3399] text-white text-[14px] sm:text-[16px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors"
            >
              SignUp
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
