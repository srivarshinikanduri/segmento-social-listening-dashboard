const API_URL = "http://localhost:5000/api/youtube/analytics";

const CHANNEL_ID = "UC_x5XG1OV2P6uZZ5FSM9Ttw";

export async function getYouTubeAnalytics() {
  const response = await fetch(
    `${API_URL}?channelId=${CHANNEL_ID}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch YouTube analytics");
  }

  return await response.json();
}