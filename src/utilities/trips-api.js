import { getToken } from "./users-service";

const BASE_URL = "/api/trips";


// create a new trip
export function newTrip(tripData) {
    // Just send itemId for best security (no pricing)
    // console.log(catData)
    return sendRequest(`${BASE_URL}/newTrip`, "POST", tripData);
  }


/*--- Helper Functions ---*/

async function sendRequest(url, method = "GET", payload = null) {
    const options = { method };
    if (payload) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if (token) {
      // Ensure headers object exists
      options.headers = options.headers || {};
      // Add token to an Authorization header
      // Prefacing with 'Bearer' is recommended in the HTTP specification
      options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    console.log(options);
    if (res.ok) return res.json();
    console.log(res.json);
    throw new Error("Bad Request");
  }
  