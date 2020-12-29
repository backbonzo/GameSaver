const API_URL = 'http://localhost:5000';

export async function listDeviceEntries() {
  const response = await fetch(`${API_URL}/api/devices`);
  return response.json();
}