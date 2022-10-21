import { getToken } from "./users-service";

const BASE_URL = "/api/places";


export function getAll() {
    return sendRequest(BASE_URL);
  }

// create a new trip
export function newPlace(placeData) {
    return sendRequest(`${BASE_URL}/newPlace`, "POST", placeData);
  }

export function deletePlace(id) {
    return sendRequest(`${BASE_URL}/deletePlace/${id}`, "DELETE");
  }

export function editPlace(id,placeData) {
    return sendRequest(`${BASE_URL}/editPlace/${id}`, 'PUT',placeData);
  }
  

/*--- Helper Functions ---*/

async function sendRequest(url, method = "GET", payload = null) {
    const options = { method };
    if (payload) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(payload);
    }
   

    const res = await fetch(url, options);

    console.log(res);
    if (res.ok) return res.json();
    console.log(res.json);
    throw new Error("Bad Request");
  }
  