interface User {
  name: string;
}

export const getUserData = async (): Promise<User> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const result = await response.json();
  return result.data.user;
};