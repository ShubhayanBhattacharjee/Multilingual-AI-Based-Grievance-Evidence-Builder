const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

function getToken() {
  try {
    const u = JSON.parse(localStorage.getItem("nivaran_user"));
    return u?.token ?? null;
  } catch {
    return null;
  }
}

async function request(method, path, body = null, opts = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opts.headers,
  };

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, config);

  let data = null;
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const msg =
      data?.message ??
      data?.error ??
      `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

// the public apis
export const api = {
  get:    (path, opts)         => request("GET",    path, null, opts),
  post:   (path, body, opts)   => request("POST",   path, body, opts),
  put:    (path, body, opts)   => request("PUT",    path, body, opts),
  patch:  (path, body, opts)   => request("PATCH",  path, body, opts),
  delete: (path, opts)         => request("DELETE", path, null, opts),
};

export default api;