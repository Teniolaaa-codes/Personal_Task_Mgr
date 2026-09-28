import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Profile from "../assets/profile.jpg";

const NavBar: React.FC = () => {
  const location = useLocation();

  const allLinks = () => {
    return location.pathname === "/" ? (
      <>
        <NavLink to="/">
          <h3 className="text-[11.5px] sm:text-[22px] font-medium text-[#292929] ">
            Home
          </h3>
        </NavLink>
        <NavLink to="/newtask">
          <h3 className="text-[11.5px] sm:text-[22px] font-medium text-[#292929] ">
            New Task
          </h3>
        </NavLink>
        <NavLink to="/mytasks">
          <h3 className="text-[11.5px] sm:text-[22px] font-medium text-[#292929] ">
            All Task
          </h3>
        </NavLink>
      </>
    ) : location.pathname === "/mytasks" ? (
      <>
        <NavLink to="/">
          <h3 className="text-[12px] sm:text-[22px] font-medium text-[#292929] ">
            Home
          </h3>
        </NavLink>
        <NavLink to="/newtask">
          <h3 className="text-[12px] sm:text-[22px] font-medium text-[#292929] ">
            New Task
          </h3>
        </NavLink>
      </>
    ) : location.pathname.startsWith("/edittask") ? (
      <>
        <NavLink to="/">
          <h3 className="text-[12px] sm:text-[22px] font-medium text-[#292929] ">
            Home
          </h3>
        </NavLink>
        <NavLink to="/newtask">
          <h3 className="text-[12px] sm:text-[22px] font-medium text-[#292929] ">
            New Task
          </h3>
        </NavLink>
        <NavLink to="/mytasks">
          <h3 className="text-[12px] sm:text-[22px] font-medium text-[#292929] ">
            All Task
          </h3>
        </NavLink>
      </>
    ) : location.pathname === "/newtask" ? (
      <>
        <NavLink to="/">
          <h3 className="text-[12px] sm:text-[22px] font-medium text-[#292929] ">
            Home
          </h3>
        </NavLink>
        <NavLink to="/mytasks">
          <h3 className="text-[12px] sm:text-[22px] font-medium text-[#292929] ">
            All Task
          </h3>
        </NavLink>
      </>
    ) : null;
  };

  return (
    <nav className="w-full border-b-3 border-[#D3B5EB] mx-auto px-5 sm:px-8 md:px-16 lg:px-42.5 py-2 sm:py-3 flex items-center justify-between rounded-b-2xl gap-3 sm:gap-0 ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="w-7.5 sm:w-[39.91px] h-7.5 sm:h-[39.91px] rounded-r-full bg-linear-to-bl from-purple-500 via-violet-500 to-slate-800 shadow-lg ">
          <h1 className="text-[35px] sm:text-[47.49px] font-normal absolute z-20 top-0.75 sm:top-3 left-6.25 sm:left-10 md:left-18 lg:left-44 text-[#FAF9FB] font-[Secular_One] ">
            T
          </h1>
        </div>

        <h3 className="font-semibold text-[16px] sm:text-[27.37px] text-[#2D0050] ">
          TaskMgr.
        </h3>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-2 sm:gap-6">
        {allLinks()}

        <div className="relative cursor-pointer">
          {/* Profile */}
          <img
            src={Profile}
            alt=""
            className="h-8 w-8 sm:h-15 sm:w-15 border-[3px] sm:border-[5px] border-[#292929] rounded-full object-cover"
          />
          <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[#974FD0] absolute top-0.5 right-0.5 sm:top-1 sm:right-1 animate-pulse "></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
