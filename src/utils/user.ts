interface User {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  cash: {
    balance: number;
    id: string;
  };
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUserData = async (): Promise<User> => {
  const response = await fetch(baseURL + "/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const result = await response.json();
  return result.data;
};

export interface UpdateProfileData {
  name: string;
  email: string;
}

export const updateUserProfile = async (data: UpdateProfileData): Promise<User> => {
  const response = await fetch(`${baseURL}/api/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  const result = await response.json();
  return result.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await fetch(baseURL + "/api/user/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};
