export async function getWeatherImage(icon) {
  try {
    const image = await import(`../assets/weather-icons/${icon}.svg`);

    return image.default;
  } catch (error) {
    console.error('Weather image not found:', error);

    const fallback = await import('../assets/weather-icons/cloudy.svg');

    return fallback.default;
  }
}
