import { BASE_URL } from "./constants.js";
export async function updateAvatar(user, avatarURL) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avatarURL),
  };
  try {
    const response = await fetch(
      `${BASE_URL}/profiles/${user.name}/media`,
      options,
    );

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
