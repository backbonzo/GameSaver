const API_URL = 'http://localhost:5000';

export async function listDeviceEntries() {
  const response = await fetch(`${API_URL}/api/devices`);
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
