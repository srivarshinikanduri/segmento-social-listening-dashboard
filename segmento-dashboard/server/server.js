const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

connectDB();

// Existing dashboard API
app.get("/api/dashboard", (req, res) => {
  res.json({
    mentions: 12540,
    engagement: 28450,
    positive: 62,
    neutral: 25,
    negative: 13
  });
});

// YouTube API + MongoDB
app.get("/api/youtube", async (req, res) => {
  try {
    const channelId = req.query.channelId;

    if (!channelId) {
      return res.status(400).json({
        error: "Please provide a YouTube channel ID"
      });
    }

    // Get data from YouTube
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics",
          id: channelId,
          key: process.env.YOUTUBE_API_KEY
        }
      }
    );

    const channel = response.data.items[0];

    if (!channel) {
      return res.status(404).json({
        error: "Channel not found"
      });
    }

    // Prepare YouTube data
    const youtubeData = {
      channelId: channelId,
      channelName: channel.snippet.title,
      subscribers: channel.statistics.subscriberCount,
      videos: channel.statistics.videoCount,
      views: channel.statistics.viewCount,
      updatedAt: new Date()
    };

    // Save to MongoDB
    try {
      const database = client.db("social_listening");
      const collection = database.collection("youtube_channels");

      await collection.updateOne(
        { channelId: channelId },
        { $set: youtubeData },
        { upsert: true }
      );

      console.log("YouTube data saved to MongoDB!");
    } catch (mongoError) {
      console.error("MongoDB save failed:", mongoError.message);
    }

    // Send YouTube data to browser
    res.json(youtubeData);

  } catch (error) {
    console.error("YouTube API error:", error.response?.data || error.message);

    res.status(500).json({
      error: "YouTube API request failed"
    });
  }
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});