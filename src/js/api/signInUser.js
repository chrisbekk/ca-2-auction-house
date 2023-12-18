import { BASE_URL, LOG_IN } from "./constants.js";
export async function signInUser(userData) {
  console.log(userData);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  try {
    const response = await fetch(`${BASE_URL}${LOG_IN}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw { status: errorData.status, data: errorData };
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
}
