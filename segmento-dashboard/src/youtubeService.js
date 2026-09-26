const API_URL = `${import.meta.env.VITE_API_URL}/api/youtube/saved`;

export async function getYouTubeData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch YouTube data");
  }

  return await response.json();
}