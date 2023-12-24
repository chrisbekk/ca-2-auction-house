import { BASE_URL } from "./constants.js";
export async function postBid(accessToken, amount, listingsID) {
  console.log(amount);
  console.log(listingsID);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ amount: amount }),
  };
  try {
    const response = await fetch(
      `${BASE_URL}/listings/${listingsID}/bids`,
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
