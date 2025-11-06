const apiClient = async (url: string, options: RequestInit = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    const result = await response.json();

    if (response.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      return Promise.reject(
        new Error("Session expired. Please log in again.")
      );
    }
    
    if (response.status == 403 && result.code == "EMAIL_NOT_VERIFIED" && window.location.pathname !== "/otp") {
      localStorage.removeItem("authToken");
      window.location.href =
        "/otp?email=" + JSON.parse(config.body as string).email;
      return Promise.reject(new Error("Session expired. Please log in again."));
    }

    if (!response.ok) {
      return Promise.reject(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default apiClient;
