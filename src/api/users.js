const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function createUser(payload) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "회원가입에 실패했습니다.");
  }
  return data;
}

