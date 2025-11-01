const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCategory = async ({
  page,
  limit,
  name,
  start_date,
  end_date,
  id,
}: {
  page: number;
  limit: number;
  name: string;
  start_date: string;
  end_date: string;
  id: string;
}) => {
  const queryParams = new URLSearchParams();

  if (id) queryParams.append("id", id);
  if (page) queryParams.append("page", String(page));
  if (limit) queryParams.append("limit", String(limit));
  if (name) queryParams.append("name", name);
  if (start_date) queryParams.append("start_date", start_date);
  if (end_date) queryParams.append("end_date", end_date);

  const response = await fetch(
    `${BASE_URL}/api/categories?${queryParams.toString()}`,
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
