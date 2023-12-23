import { BASE_URL } from "./constants.js";
export async function getUserListings(name, accessToken) {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const responseData = await fetch(
      `${BASE_URL}/profiles/${name}/listings`,
      options,
    );
    if (!responseData.ok) {
      const errorData = await responseData.json();
      throw { status: errorData.status, data: errorData };
    }
    const userListings = await responseData.json();
    return userListings;
  } catch (error) {
    throw error;
  }
}
