const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCategory = async ({
  page,
  limit,
  name,
  start_date,
  end_date,
}: {
  page: number;
  limit: number;
  name: string;
  start_date: string;
  end_date: string;
}) => {
  const response = await fetch(
    `${BASE_URL}/api/categories?page=${page}&limit=${limit}&name=${name}&start_date=${start_date}&end_date=${end_date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data.data;
};
