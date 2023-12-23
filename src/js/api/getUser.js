import { BASE_URL, USERDATA } from "./constants.js";
export async function getUser(username, accessToken) {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const responseData = await fetch(
      `${BASE_URL}${USERDATA}${username}?_listings=true&_bids=true`,
      options,
    );
    if (!responseData.ok) {
      const errorData = await responseData.json();
      throw { status: errorData.status, data: errorData };
    }
    const userData = await responseData.json();

    return userData;
  } catch (error) {
    console.log(error);
  }
}
