import { BASE_URL } from "./constants.js";
export async function register(userData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw { status: errorData.status, data: errorData };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}
