export const getHighlightInbox = async (): Promise<any> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/inbox/highlight",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch highlight inbox data");
  }

  const result = await response.json();
  return result.data;
};

export const getInbox = async (): Promise<any> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/inbox",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch inbox data");
  }

  const result = await response.json();
  return result.data;
};

export const markAsRead = async (id: string): Promise<any> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/inbox/" + id + "/read",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark inbox as read");
  }

  const result = await response.json();
  return result.data;
};