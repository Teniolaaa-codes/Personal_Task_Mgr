import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import type { TaskCategory, TaskFormValues } from "../types/tasks";
import { useTasks } from "../hooks/useTasks";
import { ALL_CATEGORIES, CATEGORY_STYLES } from "../utils/categoryStyles";

const NewTask: React.FC = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState<TaskFormValues>({
    title: "",
    description: "",
    dueDate: "",
    category: "Work",
  });

  // Inline field-level errors (no alert popups)
  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskFormValues, string>>
  >({});

  const updateField = (field: keyof TaskFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    // Clear error for this field as user types
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  /** Validate all required fields and due-date constraint. */
  const validate = (): boolean => {
    const next: Partial<Record<keyof TaskFormValues, string>> = {};

    if (!form.title.trim()) next.title = "Title is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.dueDate) {
      next.dueDate = "Due date is required";
    } else if (form.dueDate < today) {
      next.dueDate = "Due date cannot be in the past";
    }
    if (!form.category) next.category = "Category is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addTask({
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      category: form.category,
    });
    // Submit navigates to My Tasks page as required
    navigate("/mytasks");
  };

  return (
    <div className="w-full pt-5 sm:pt-12 px-5 pb-8 lg:px-42.5 flex flex-col gap-4 lg:gap-15 justify-center items-center ">
      {/* Back link */}
      <div className="flex gap-1 sm:gap-3 items-center w-full text-start ">
        <Link to="/mytasks" className="cursor-pointer">
          <FaChevronLeft className="text-[8px] sm:text-[24px] text-[#292929]" />
        </Link>
        <h3 className="font-medium text-[12px] sm:text-[30px] text-[#292929] ">
          New Task
        </h3>
      </div>

      {/* Form content */}
      <form
        className="w-full lg:w-275 border-2 border-[#D3B5EB] bg-[#f9f1ff] rounded-[10px] px-14 py-12 flex flex-col "
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="flex flex-col gap-12">
          {/* Task Title */}
          <div className="relative ">
            <input
              id="taskTitle"
              required
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="E.g Project Defense, Assignment..."
              className={`w-full border-2 border-[#D3B5EB] rounded-[5px] px-16 p-6 text-[#292929] text-[24px] hover:border-[#974FD0] outline-none placeholder:text-[#CCCCCC] placeholder:text-[22px] placeholder:font-normal focus:border-[#974FD0] ${
                errors.title ? "border-red-400" : "border-[#D3B5EB]"
              }`}
            />
            <label
              htmlFor="taskTitle"
              className="absolute left-16 -top-5 bg-[#f9f1ff] text-[16px] sm:text-[24px] font-medium rounded-md text-[#974FD0]/70 "
            >
              Task Title *
            </label>
            {errors.title && (
              <p className="mt-1 text-left text-sm text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          {/* Task Description */}
          <div className="relative ">
            <textarea
              id="description"
              rows={7}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Briefly describe your task..."
              className={`w-full border-2 border-[#D3B5EB] rounded-[5px] px-16 pt-6.75 pb-6 text-[#292929] text-[18px] hover:border-[#974FD0] outline-none placeholder:text-[#CCCCCC] placeholder:text-[22px] placeholder:font-normal focus:border-[#974FD0] resize-none ${
                errors.description ? "border-red-400" : "border-[#B8B6B6]"
              }`}
            />

            {/* Floating Label */}
            <label
              htmlFor="description"
              className="absolute left-16 font-medium -top-4 bg-[#f9f1ff] text-[#974FD0]/70 text-[16px] sm:text-[24px]"
            >
              Description *
            </label>
            {/* Description error */}
            {errors.description && (
              <p className="mt-1 text-left text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* Due date */}
          <div className="w-full">
            {/* Field block */}
            <div
              className={`relative flex flex-col items-start w-full rounded-md border-2 hover:border-[#974FD0] px-8 py-6 text-lg ${
                errors.dueDate ? "border-red-400" : "border-[#D3B5EB]"
              }`}
            >
              {/* Floating label */}
              <label
                htmlFor="dueDate"
                className="absolute z-20 -top-4.75 left-16 bg-[#f9f1ff] text-[22px] font-medium text-[#974FD0]/70"
              >
                Due Date *
              </label>
              <input
                id="dueDate"
                type="date"
                required
                min={today}
                value={form.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
                className="w-full text-[18px] pl-[33.25px] pr-8.75 rounded-sm border border-[#974FD0]/30 outline-[#974FD0]/50 cursor-pointer"
              />
            </div>
            {/* Due date error */}
            {errors.dueDate && (
              <p className="mt-3 text-left text-sm text-red-500 w-full">
                {errors.dueDate}
              </p>
            )}
          </div>

          {/* Category select */}
          <div className="relative border-2 border-[#D3B5EB] rounded-[5px] px-4 sm:px-8 md:px-14 pt-7 pb-5 hover:border-[#974FD0]  ">
            {/* Floating Label */}
            <p className=" absolute z-20 bg-[#f9f1ff] mb-3 text-[16px] sm:text-[22px] text-[#974FD0]/70 -top-4 left-15 font-medium">
              Categories *
            </p>
            {/* All Categories*/}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {ALL_CATEGORIES.map((cat) => {
                const styles = CATEGORY_STYLES[cat];
                const selected = form.category === cat;
                return (
                  <label
                    key={cat}
                    className={`cursor-pointer select-none
                      px-5 py-1 rounded-full border-2
                      text-[12px] sm:text-[18px] font-medium
                      transition-transform duration-200 ease-out
                      hover:scale-105
                      ${styles.text} ${styles.bg} ${styles.border}
                      ${selected ? `${styles.selectedBg} ${styles.selectedBorder} ${styles.selectedText} ring ring-current` : ""}
                    `}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selected}
                      onChange={() =>
                        updateField("category", cat as TaskCategory)
                      }
                      className="sr-only"
                    />
                    {cat}
                  </label>
                );
              })}
            </div>
            {/* Category error */}
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#974FD0] cursor-pointer hover:bg-[#6B3399] text-white text-2xl mt-5 font-semibold py-4 rounded-lg transition-colors"
          >
            Done
          </button>
        </fieldset>
      </form>

      {/* BACK-TO-TOP */}
      <div className="text-center mt-6">
        <a
          href="#"
          className="font-normal text-[18px] sm:text-[24px] underline text-[#974FD0] cursor-pointer hover:text-[#6b3399] "
        >
          Back To Top
        </a>
      </div>
    </div>
  );
};

export default NewTask;
