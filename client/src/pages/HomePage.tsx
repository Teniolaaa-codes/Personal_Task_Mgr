import React from "react";
import HeroImg from "../assets/heroImg.png";
import { Link } from "react-router-dom";


const HomePage: React.FC = () => {
  return (
    <header className="flex flex-col items-center">
      <div className="w-full mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 py-10 sm:py-16 md:py-20 px-5 sm:px-8 md:px-16 lg:px-42.5">
        <div className="flex flex-col items-start gap-5 w-full md:w-133.75 text-start ">
          <h1 className="font-medium text-[35px] sm:text-[50px] leading-[120%] tracking-[0%] text-[#292929] ">
            Manage your Tasks on
            <span className="text-[#974FD0] "> TaskMgr.</span>
          </h1>

          <p className="font-normal text-[14px] md:text-[20px] lg:text-[24px] leading-[120%] tracking-[0%] pr-9 lg:pr-0 text-[#737171] text-start ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>

          <Link to="/mytasks">
            <button className="py-2.5 px-5 sm:px-6.25 text-[#FAF9FB] bg-[#974FD0] rounded-lg text-center font-medium text-[16px] md:text-[24px] cursor-pointer hover:bg-[#6B3399] transition-colors ">
              Go to My Tasks
            </button>
          </Link>
        </div>

        <img src={HeroImg} alt="" />
      </div>
    </header>
  );
};

export default HomePage;
