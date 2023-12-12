import { BASE_URL, LISTINGS } from "./constants.js";

export async function getListings() {
  try {
    const response = await fetch(`${BASE_URL}${LISTINGS}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw { status: errorData.status, data: errorData };
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
}
