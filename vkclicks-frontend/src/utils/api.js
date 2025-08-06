export const apiFetch = (url, options = {}) => {
  const token = localStorage.getItem("photographerToken");
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
      ...options.headers,
    },
  });
};
