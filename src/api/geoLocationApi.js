// this API returns location based on the return value(lat, lon parameter) on navigator.geolocation on index.js
export async function getAddress(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  try {
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error(`HTTP Error: ${responce.status}`);
    }
    const data = await responce.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
