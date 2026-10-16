import { API_BASE, authHeaders } from "./config";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  token?: string;
  user?: AuthUser;
};

export async function signupUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: authHeaders(null),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}

export async function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: authHeaders(null),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

export async function fetchMe(token: string): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Not authorized");
  }
  return data.user as AuthUser;
}
