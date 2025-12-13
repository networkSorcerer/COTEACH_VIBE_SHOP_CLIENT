const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function login(payload) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "로그인에 실패했습니다.");
  }
  return data;
}

export async function getMe() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const url = `${API_BASE}/auth/me`;
  console.log("Fetching user info from:", url);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Failed to fetch user:", data);
    throw new Error(data?.message || "유저 정보를 가져오는데 실패했습니다.");
  }
  return data;
}

