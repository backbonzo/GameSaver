const API_URL = 'http://localhost:8080';

export async function listDeviceEntries() {
  let t0 = performance.now();
  const response = await fetch(`${API_URL}/api/devices`);
  let t1 = performance.now();
  console.log("Call to fetch took " + (t1 - t0) + " milliseconds.");
  return response.json();
}

export async function createDeviceMarker(device) {
  const apiKey = device.apiKey;
  delete device.apiKey;
  const response = await fetch(`${API_URL}/api/devices`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify(device),
  });
  // below we create a response of json and send it if it s OK
  // otherwise we create a error and send that as a JSON message in response
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
