interface User {
  name: string;
}

export const getUserData = async (): Promise<User> => {
  const response = await fetch("http://95.217.188.76:3030/api/user", {
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