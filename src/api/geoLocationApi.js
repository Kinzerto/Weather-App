// this API returns location based on the return value(lat, lon parameter) on navigator.geolocation on index.js
export async function getAddress(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to locate location');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
