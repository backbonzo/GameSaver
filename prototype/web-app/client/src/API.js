const API_URL = 'http://localhost:5000';

export async function listDeviceEntries() {
  let t0 = performance.now();
  const response = await fetch(`${API_URL}/api/devices`);
  let t1 = performance.now();
  console.log("Call to fetch took " + (t1 - t0) + " milliseconds.");
  console.log()
  return response.json();
}

export async function createDeviceMarker(device) {
  const response = await fetch(`${API_URL}/api/devices`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(device),
  });
  return response.json();
}
