
const apiRequest = (url, options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    authorization: document.cookie,
  };

  return fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
};

export default apiRequest;
