const API_URL = "http://localhost:5000/api/youtube/saved";

export async function getYouTubeData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch YouTube data");
  }

  return await response.json();
}