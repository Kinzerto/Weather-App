export async function astronomy(lat, lon) {
  const url = `https://api.ipgeolocation.io/v3/astronomy?apiKey=06450d0f961d4ca49556dc29f2c23757&lat=${lat}&long=${lon}&elevation=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch astronomy');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
