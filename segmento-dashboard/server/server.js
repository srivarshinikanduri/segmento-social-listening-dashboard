const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

// MongoDB connection
async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

connectDB();

// Dashboard API
app.get("/api/dashboard", (req, res) => {
  res.json({
    mentions: 12540,
    engagement: 28450,
    positive: 62,
    neutral: 25,
    negative: 13
  });
});


// ===============================
// YOUTUBE ANALYTICS API
// ===============================

app.get("/api/youtube/analytics", async (req, res) => {
  try {
    const channelId = req.query.channelId;

    if (!channelId) {
      return res.status(400).json({
        error: "Please provide a YouTube channel ID"
      });
    }

    // 1. Get channel information
    const channelResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics,contentDetails",
          id: channelId,
          key: process.env.YOUTUBE_API_KEY
        }
      }
    );

    const channel = channelResponse.data.items[0];

    if (!channel) {
      return res.status(404).json({
        error: "Channel not found"
      });
    }

    const channelData = {
      channelId: channel.id,
      channelName: channel.snippet.title,
      description: channel.snippet.description,
      publishedAt: channel.snippet.publishedAt,
      thumbnail: channel.snippet.thumbnails?.high?.url || "",
      subscribers: Number(channel.statistics.subscriberCount || 0),
      videos: Number(channel.statistics.videoCount || 0),
      views: Number(channel.statistics.viewCount || 0),
      uploadsPlaylistId:
        channel.contentDetails.relatedPlaylists.uploads,
      updatedAt: new Date()
    };


    // 2. Get recent videos
    const playlistResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId:
            channelData.uploadsPlaylistId,
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY
        }
      }
    );

    const videoIds =
      playlistResponse.data.items
        .map((item) => item.snippet.resourceId.videoId)
        .join(",");


    // 3. Get statistics for those videos
    let videos = [];

    if (videoIds) {
      const videosResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,statistics,contentDetails",
            id: videoIds,
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );

      videos = videosResponse.data.items.map((video) => ({
        videoId: video.id,
        title: video.snippet.title,
        thumbnail:
          video.snippet.thumbnails?.medium?.url || "",
        publishedAt: video.snippet.publishedAt,
        views: Number(video.statistics.viewCount || 0),
        likes: Number(video.statistics.likeCount || 0),
        comments: Number(
          video.statistics.commentCount || 0
        ),
        duration:
          video.contentDetails.duration
      }));
    }


    // 4. Calculate totals from recent videos
    const recentVideoViews = videos.reduce(
      (total, video) => total + video.views,
      0
    );

    const recentVideoLikes = videos.reduce(
      (total, video) => total + video.likes,
      0
    );

    const recentVideoComments = videos.reduce(
      (total, video) => total + video.comments,
      0
    );


    // 5. Send analytics to frontend
    res.json({
      channel: channelData,

      summary: {
        subscribers: channelData.subscribers,
        totalViews: channelData.views,
        totalVideos: channelData.videos,
        recentVideoViews,
        recentVideoLikes,
        recentVideoComments
      },

      recentVideos: videos,

      updatedAt: new Date()
    });

  } catch (error) {

    console.error(
      "YouTube Analytics Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to fetch YouTube analytics"
    });
  }
});


// ===============================
// OLD YOUTUBE API
// ===============================

app.get("/api/youtube", async (req, res) => {
  try {
    const channelId = req.query.channelId;

    if (!channelId) {
      return res.status(400).json({
        error: "Please provide a YouTube channel ID"
      });
    }

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

    const youtubeData = {
      channelId,
      channelName: channel.snippet.title,
      subscribers: channel.statistics.subscriberCount,
      videos: channel.statistics.videoCount,
      views: channel.statistics.viewCount,
      updatedAt: new Date()
    };

    try {
      const database = client.db("social_listening");
      const collection =
        database.collection("youtube_channels");

      await collection.updateOne(
        { channelId },
        { $set: youtubeData },
        { upsert: true }
      );

      console.log("YouTube data saved to MongoDB!");
    } catch (mongoError) {
      console.error(
        "MongoDB save failed:",
        mongoError.message
      );
    }

    res.json(youtubeData);

  } catch (error) {
    console.error(
      "YouTube API error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "YouTube API request failed"
    });
  }
});


// ===============================
// SAVED YOUTUBE DATA
// ===============================

app.get("/api/youtube/saved", async (req, res) => {
  try {
    const database = client.db("social_listening");

    const collection =
      database.collection("youtube_channels");

    const youtubeData = await collection
      .find({})
      .sort({ updatedAt: -1 })
      .limit(1)
      .toArray();

    if (youtubeData.length === 0) {
      return res.status(404).json({
        error: "No YouTube data found in MongoDB"
      });
    }

    res.json(youtubeData[0]);

  } catch (error) {
    console.error(
      "MongoDB data retrieval failed:",
      error.message
    );

    res.status(500).json({
      error: "Failed to retrieve YouTube data"
    });
  }
});


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});