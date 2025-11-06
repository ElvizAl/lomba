import { UpdateProfileData, User } from "@/types";
import apiClient from "@/lib/api-client";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUserData = async (): Promise<User> => {
  try {
    const result = await apiClient(`${baseURL}/api/user`);
    return result.data;
  } catch (error) {
    console.error('Get user data error:', error);
    throw error;
  }
};

export const updateUserProfile = async (data: UpdateProfileData): Promise<User> => {
  try {
    const result = await apiClient(`${baseURL}/api/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return result.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const result = await apiClient(baseURL + "/api/user/upload", {
      method: "POST",
      body: formData,
    });
    return result.data;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};
