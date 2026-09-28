import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const EditTask: React.FC = () => {
  return (
    <div className="w-full py-8 px-42.5 flex flex-col gap-15 justify-center items-center mt-4 ">
      <div className="flex gap-5 items-center w-full text-start ">
        <Link to="/mytasks" className="cursor-pointer">
          <FaChevronLeft className="text-[35px] text-[#292929]" />
        </Link>
        <h3 className="font-medium text-[50px] text-[#292929] ">Edit Task</h3>
      </div>

      <form className="w-full">
        <fieldset>
          {/* FIELDSET: Groups related form inputs semantically */}
          <div className="relative mb-12">
            <input
              id="taskTitle"
              type="text"
              placeholder="Project Completion"
              className="w-full border border-[#B8B6B6] rounded-[5px] px-14 pt-8.75 pb-6 text-[#292929] outline-none placeholder:text-[#292929] placeholder:text-[22px] placeholder:font-normal focus:border-[#974FD0]"
            />

            <label
              htmlFor="taskTitle"
              className="absolute left-12 -top-5 bg-white px-2 text-[#9C9C9C] text-[30px]"
            >
              Task Title
            </label>
          </div>
          {/* = */}
          <div className="relative mb-12">
            {/* resize-none: Prevents textarea resizing */}
            <textarea
              id="description"
              rows={7}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra sit in aliquam pretium. Diam consectetur at tincidunt sed non tempus faucibus posuere eu. Nisi, luctus turpis pharetra quis nunc nulla. At lectus faucibus mattis ante eleifend ac arcu. Nibh morbi adipiscing leo tempus non dolor viverra cras. Sapien in nulla cum fermentum auctor lectus orci. Felis tincidunt lacus, fermentum laoreet sit sit. Lacus, orci pretium, etiam justo lacus. Amet, ultrices eget auctor euismod vitae diam."
              className="w-full border border-[#B8B6B6] rounded-[5px] px-14 pt-6.75 pb-6 text-[#292929] outline-none placeholder:text-[#292929] placeholder:text-[22px] placeholder:font-normal focus:border-[#974FD0] resize-none"
            ></textarea>

            {/* Floating Label */}
            <label
              htmlFor="description"
              className="absolute left-12 -top-5 bg-white px-2 text-[#9C9C9C] text-[30px]"
            >
              Description
            </label>
          </div>
          {/* Category= */}
          <div className="relative mb-14">
            <details className="group ">
              {/* Dropdown Button */}
              <summary className="list-none flex items-center justify-between border border-[#B8B6B6] active:border-[#974FD0] rounded-md pl-14 pt-5 pb-3 cursor-pointer bg-white pr-6 ">
                <span className="text-[#CCCCCC] text-[22px] ">Select Category</span>

                {/* Arrow */}
                <svg
                  className="w-10 h-7.5 text-[#9C9C9C] transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              {/* Dropdown Content */}
              <div className="absolute left-0 mt-1 w-full bg-[#FFFFFF] border-b border-x border-[#974FD0] rounded-md z-10">
                <label className="flex items-center gap-3 px-14 py-3 hover:bg-[#CCCCCC] cursor-pointer">
                  <input
                    type="radio"
                    name="tag"
                    className="accent-purple-600"
                  />
                  <span className="text-[#9C9C9C] font-normal text-[22px] ">
                    Urgent
                  </span>
                </label>

                <label className="flex items-center gap-3 px-14 py-3 hover:bg-[#CCCCCC] cursor-pointer">
                  <input
                    type="radio"
                    name="tag"
                    className="accent-purple-600"
                  />
                  <span className="text-[#9C9C9C] font-normal text-[22px] ">
                    Important
                  </span>
                </label>
              </div>
            </details>

            {/* Floating Label */}
            <label className="absolute left-12 -top-3.75 bg-white px-2 text-[#9C9C9C] text-2xl ">
              Tags
            </label>
          </div>
          {/* BUTTON= */}
          <button
            type="submit"
            className="w-full bg-[#974FD0] cursor-pointer hover:bg-[#6B3399] text-white text-2xl font-semibold py-4 rounded-lg "
          >
            Done
          </button>
          {/* BACK-TO-TOP= */}
          <div className="text-center mt-12">
            <a
              href="#"
              className="font-normal text-[26px] underline text-[#974FD0] cursor-pointer hover:text-[#6b3399] "
            >
              Back To Top
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default EditTask;
