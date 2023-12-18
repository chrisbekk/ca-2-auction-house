// API BASE URL
export const BASE_URL = "https://api.noroff.dev/api/v1/auction";
// LOG IN ENDPOINT
export const LOG_IN = "/auth/login";
// API LISTINGS ENDPOINT - THIS ENDPOINT RETRIEVES ONLY ACTIVE LISTINGS & PROVIDES ADDITIONAL DETAILS ABOUT BIDS
export const LISTINGS = "/listings?_bids=true&_active=true";
// API ENDPOINT FOR A SINGLE LISTING
export const SINGLELISTING = "/listings";
// API ENDPOINT FOR FETCHING USER DATA -- REQUIRES AUTHENTICATION
export const USERDATA = "/profiles/";
// API ENDPOINT FOR FETCHING LISTINGS FOR USER
export const USERLISTINGS = "/profiles/<name>/listings";
