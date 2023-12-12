import { BASE_URL, SINGLELISTING } from "./constants.js";
const QUERYS = "?_bids=true&_seller=true";
export async function getSingleListing(listingID) {
  try {
    console.log(listingID);
    const response = await fetch(
      `${BASE_URL}${SINGLELISTING}/${listingID}${QUERYS}`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw { status: errorData.status, data: errorData };
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
