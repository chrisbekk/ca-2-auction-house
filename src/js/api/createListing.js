import { BASE_URL } from "./constants.js";
export async function createListing(user, listing) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listing),
  };
  try {
    const responseData = await fetch(`${BASE_URL}/listings`, options);
    if (!responseData.ok) {
      const errorData = await responseData.json();
      throw { status: errorData.status, data: errorData };
    }
    const userData = await responseData.json();

    return userData;
  } catch (error) {
    throw error;
  }
}
