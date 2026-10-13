const API_BASE =
// Central place to call the backend so the UI can request filtered results from the server
  (import.meta as ImportMeta & { env?: { VITE_API_URL?: string } }).env
    ?.VITE_API_URL || "http://localhost:4001";

export type FetchTasksParams = {
  search?: string;
  category?: string;
  completed?: "true" | "false";
  token: string;
};

// Fetch the current user's tasks from the server
export async function fetchTasks(params: FetchTasksParams) {
  const qs = new URLSearchParams();
  if (params.search?.trim()) qs.set("search", params.search.trim());
  if (params.category && params.category !== "All") {
    qs.set("category", params.category);
  }
  if (params.completed) qs.set("completed", params.completed);

  const url = `${API_BASE}/api/tasks${qs.toString() ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch tasks");
  }
  return data as {
    success: boolean;
    count: number;
    tasks: Array<{
      id: string;
      title: string;
      description: string;
      dueDate: string;
      category: string;
      completed: boolean;
    }>;
  };
}
