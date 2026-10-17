import React, { useState, useRef, useEffect, useCallback } from "react";
import { FiPlus, FiChevronDown } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import type { Task, TaskCategory } from "../types/tasks";
import { ALL_CATEGORIES, CATEGORY_STYLES } from "../utils/categoryStyles";
import { FaRegEdit } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { useAuth } from "../context/authContext";
import { deleteTaskApi, fetchTasks, statusTaskApi } from "../api/taskAPI";

type CategoryFilter = "All" | TaskCategory;
type CompletionFilter = "All" | "Incomplete" | "Complete";

// API base URL for task requests
// const API_BASE =
//   (import.meta.env.VITE_API_URL as string | undefined) ||
//   "http://localhost:4001";

// Read JWT token from environment variable or localStorage
// function getAuthToken(): string | null {
//   const fromEnv = import.meta.env.VITE_DEMO_TOKEN as string | undefined;
//   if (fromEnv && fromEnv.trim()) return fromEnv.trim();
//   return localStorage.getItem("token");
// }

// Format ISO date string as DD/MM/YYYY
function formatDueDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

// Filter dropdowns
const FilterDropdown = <T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Filter dropdown label buttons */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-2 min-w-10 sm:min-w-40 border-2 border-[#D3B5EB] rounded-lg px-3 py-2 sm:py-2.5 bg-white text-[#292929] text-[12px] sm:text-[16px] font-medium hover:border-[#974FD0] transition-colors cursor-pointer"
      >
        <span className="flex-wrap items-center gap-2 ">
          {label}: <span className="text-[#974FD0]"> {value}</span>
        </span>
        <FiChevronDown
          className={`text-[#9C9C9C] transition-transform ${open ? "rotate-180 text-[#974FD0] " : ""}`}
        />
      </button>

      {/* Dropdown opened list */}
      {open && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-[#974FD0] rounded-md shadow-lg z-20 overflow-hidden">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[12px] sm:text-[14px] md:text-[16px] hover:bg-[#F5EEFB] cursor-pointer transition-colors ${
                  value === opt
                    ? "bg-[#F5EEFB] text-[#974FD0] font-semibold"
                    : "text-[#292929]"
                }`}
              >
                {/* Radio-style indicator */}
                <span className="inline-block w-3 h-3 rounded-full border-2 border-current mr-2 align-middle">
                  {value === opt && (
                    <span className="block w-full h-full rounded-full bg-current scale-50" />
                  )}
                </span>
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Task card
const TaskCard: React.FC<{
  task: Task;
  onStatus: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ task, onStatus, onDelete }) => {
  const styles = CATEGORY_STYLES[task.category];
  const isDone = task.completed;

  return (
    <div
      className={`border-2 border-[#D3B5EB] hover:border-[#974FD0] hover:-translate-y-0.5 shadow-md rounded-xl p-3 sm:p-5 flex gap-3 sm:gap-4 items-start transition-opacity ${
        isDone ? "opacity-70 " : ""
      }`}
    >
      {/* Left side: Preceding completion checkbox */}
      <div className="pt-1 shrink-0">
        <input
          type="radio"
          checked={isDone}
          onChange={() => {}}
          onClick={() => onStatus(task.id)}
          aria-label={`Mark "${task.title}" as ${isDone ? "incomplete" : "complete"}`}
          className="w-5 h-5 sm:w-6 sm:h-6 accent-[#974FD0] cursor-pointer rounded"
        />
      </div>

      {/* Right side: Card content */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
        {/* Top row: */}
        <div className="flex flex-col gap-2 ">
          <div className="w-full flex flex-wrap justify-between items-start ">
            {/* Category badge */}
            <span
              className={`px-4 py-1.5 rounded-full text-[12px] sm:text-[18px] font-medium border-2 ${styles.selectedText} ${styles.selectedBg} ${styles.selectedBorder}`}
            >
              {task.category}
            </span>

            {/* Edit + Delete */}
            <div className="flex gap-2 sm:gap-3">
              {/* Edit button (non-clickable disabled when task is completed) */}
              {isDone ? (
                <button
                  type="button"
                  disabled
                  className="flex gap-1.5 sm:gap-2.5 bg-[#974FD0]/60 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg items-center cursor-not-allowed"
                >
                  <FaRegEdit className="text-[#FAF9FB] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[#FAF9FB] font-medium text-[14px] sm:text-[18px]">
                    Edit
                  </span>
                </button>
              ) : (
                <Link to={`/edittask/${task.id}`}>
                  <button
                    type="button"
                    className="flex gap-1.5 sm:gap-2.5 bg-[#974FD0] py-1.5 sm:py-2.5 px-3 sm:px-5 rounded-lg items-center cursor-pointer hover:bg-[#6B3399] transition-colors"
                  >
                    <FaRegEdit className="text-[#FAF9FB] w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[#FAF9FB] font-medium text-[14px] sm:text-[18px]">
                      Edit
                    </span>
                  </button>
                </Link>
              )}

              {/* Delete button */}
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="flex gap-1.5 sm:gap-2.5 bg-[#FAF9FB] py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg items-center border-2 border-[#974FD0] cursor-pointer hover:bg-[#F5EEFB] transition-colors"
              >
                <LuTrash2 className="text-[#974FD0] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[#974FD0] font-medium text-[14px] sm:text-[18px]">
                  Delete
                </span>
              </button>
            </div>
          </div>

          {/* Horizontal line */}
          <hr className="border-t-2 border-[#D3B5EB]" />
        </div>

        {/* Title (capitalize) + description */}
        <div className="flex-1 flex flex-col gap-2 items-start text-left min-w-0 w-full">
          <h4
            className={`w-full min-w-0 truncate text-[20px] sm:text-[28px] md:text-[32px] text-[#292929] tracking-wide capitalize ${
              isDone ? "line-through text-[#9C9C9C]" : ""
            }`}
          >
            {task.title}
          </h4>
          <p
            className={`w-full min-w-0 truncate text-[#737171] text-[14px] sm:text-[18px] md:text-[20px] font-normal leading-[130%] text-start ${
              isDone ? "line-through" : ""
            }`}
          >
            {task.description}
          </p>
        </div>

        {/* Due date aligned bottom-right */}
        <div className="flex justify-end">
          <span
            className={`text-[13px] sm:text-[16px] font-medium px-3 py-1.5 rounded-md border border-[#D3B5EB] hover:border-[#974FD0] bg-[#FAF9FB] text-[#292929] ${
              isDone ? "line-through text-[#9C9C9C]" : ""
            }`}
          >
            Due Date: {formatDueDate(task.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

const MyTasks: React.FC = () => {
  const { token } = useAuth();
  // Tasks come from the API
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [completionFilter, setCompletionFilter] =
    useState<CompletionFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  // Debounced search so we don't hit the API on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300);
    return () => window.clearTimeout(t);
  }, [searchQuery]);

  // Load tasks from GET /api/tasks with search + filters
  const loadTasks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const list = await fetchTasks({
        token,
        search: debouncedSearch || undefined,
        category: categoryFilter,
        completed:
          completionFilter === "Complete"
            ? "true"
            : completionFilter === "Incomplete"
              ? "false"
              : undefined,
      });
      setTasks(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [token, debouncedSearch, categoryFilter, completionFilter]);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  // Toggle task status --> PATCH /api/tasks/:id/status
  const handleStatus = async (id: string) => {
    if (!token) return;
    try {
      await statusTaskApi(token, id);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status toggle failed");
    }
  };

  // Delete tasks by id --> DELETE /api/tasks/:id
  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteTaskApi(token, id);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  const categoryOptions: CategoryFilter[] = ["All", ...ALL_CATEGORIES];
  const completionOptions: CompletionFilter[] = [
    "All",
    "Incomplete",
    "Complete",
  ];

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 md:px-16 lg:px-42.5 flex flex-col gap-6 sm:gap-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium text-[28px] md:text-[40px] text-[#292929] tracking-[0%] text-left">
          My Tasks
        </h3>
        <Link
          to="/newtask"
          className="flex gap-2 sm:gap-4 items-center cursor-pointer"
        >
          <FiPlus className="text-[#974FD0] h-5 w-5 sm:h-6 sm:w-6" />
          <h5 className="text-[#974FD0] text-[14px] sm:text-[24px] font-medium tracking-[0%]">
            Add New Task
          </h5>
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex justify-between gap-4 w-full">
        {/* Search input - search tasks by title/description */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[12px] sm:text-[14px] xl:text-[19px] font-medium text-[#292929] shrink-0">
            Search:
          </span>
          <div className="relative 2xl:w-135 w-20 ">
            <BiSearchAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9C9C] w-5 h-5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title or description..."
              aria-label="Search tasks"
              className="w-full border-2 bg-white border-[#D3B5EB] rounded-lg pl-10 pr-4 py-2 sm:py-2.5 text-[12px] sm:text-[16px] text-[#292929] outline-none focus:border-[#974FD0] font-medium hover:border-[#974FD0]/60 focus:shadow-md focus:border-2 placeholder:text-[#CCCCCC] transition-colors "
            />
          </div>
        </div>

        {/* Filters: Categories + Completion Status */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[12px] sm:text-[14px] xl:text-[19px] font-medium text-[#292929] shrink-0">
            Filters:
          </span>
          <div className="flex gap-3 sm:gap-4">
            <FilterDropdown
              label="Categories"
              value={categoryFilter}
              options={categoryOptions}
              onChange={setCategoryFilter}
            />
            <FilterDropdown
              label="Completion"
              value={completionFilter}
              options={completionOptions}
              onChange={setCompletionFilter}
            />
          </div>
        </div>
      </div>

      {/* Error + Loading */}
      {error && (
        <p className="text-left text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      {loading && <p className="text-[#9C9C9C] text-[16px]">Loading tasks…</p>}

      {/* Task list: empty by default + when no tasks */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {!loading && tasks.length === 0 ? (
          <div className="border-2 border-[#D3B5EB] rounded-lg bg-[#FAF9FB] text-center py-16 flex flex-col items-center gap-5 text-[#9C9C9C]">
            <p className="px-7.5 text-[18px] sm:text-[22px]">
              {debouncedSearch ||
              categoryFilter !== "All" ||
              completionFilter !== "All"
                ? "No tasks match the selected filters or search. Try a different combo!😊"
                : "No tasks yet. Click the button below to create your first task!👇"}
            </p>
            <Link
              to="/newtask"
              className="inline-block mt-4 text-[#974FD0] underline text-[16px] sm:text-[24px] hover:text-[#6B3399]"
            >
              Add New Task
            </Link>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatus={handleStatus}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Back To Top */}
      <div className="text-center mt-4 sm:mt-6">
        <a
          href="#"
          className="font-normal text-[18px] sm:text-[24px] underline text-[#974FD0] cursor-pointer hover:text-[#6b3399]"
        >
          Back To Top
        </a>
      </div>
    </div>
  );
};

export default MyTasks;
