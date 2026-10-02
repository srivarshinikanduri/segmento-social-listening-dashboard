const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const REDIRECT_URI =
  process.env.YOUTUBE_REDIRECT_URI ||
  "http://localhost:5000/auth/google/callback";


// ======================================================
// GOOGLE OAUTH
// ======================================================

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  REDIRECT_URI
);

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly"
];

const TOKEN_PATH = path.join(
  __dirname,
  "youtube-token.json"
);

let oauthState = null;


// ======================================================
// HOME
// ======================================================

app.get("/", (req, res) => {
  res.send("Segmento backend is running.");
});


// ======================================================
// GOOGLE LOGIN
// ======================================================

app.get("/auth/google", (req, res) => {

  console.log("Google OAuth route called");

  oauthState = crypto
    .randomBytes(32)
    .toString("hex");

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: GOOGLE_SCOPES,
    include_granted_scopes: true,
    prompt: "consent",
    state: oauthState
  });

  res.redirect(authUrl);
});


// ======================================================
// GOOGLE CALLBACK
// ======================================================

app.get("/auth/google/callback", async (req, res) => {

  try {

    const { code, state } = req.query;

    if (!code) {
      return res.status(400).send(
        "Google authorization code is missing."
      );
    }

    if (state !== oauthState) {
      return res.status(400).send(
        "Invalid OAuth state."
      );
    }

    oauthState = null;

    const { tokens } =
      await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    fs.writeFileSync(
      TOKEN_PATH,
      JSON.stringify(tokens, null, 2)
    );

    console.log(
      "YouTube OAuth authorization successful!"
    );

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Segmento YouTube Connected</title>
      </head>

      <body style="
        font-family: Arial;
        text-align: center;
        padding-top: 80px;
      ">

        <h1>✅ YouTube Connected Successfully</h1>

        <p>
          Your YouTube account is now connected to Segmento.
        </p>

        <p>
          You can close this window.
        </p>

      </body>
      </html>
    `);

  } catch (error) {

    console.error(
      "OAuth callback error:",
      error.response?.data || error.message
    );

    res.status(500).send(
      "Google authorization failed. Check the terminal."
    );
  }
});


// ======================================================
// LOAD YOUTUBE TOKEN
// ======================================================

function loadYouTubeToken() {

  try {

    if (!fs.existsSync(TOKEN_PATH)) {
      return false;
    }

    const tokenData = JSON.parse(
      fs.readFileSync(
        TOKEN_PATH,
        "utf8"
      )
    );

    oauth2Client.setCredentials(tokenData);

    return true;

  } catch (error) {

    console.error(
      "Token loading error:",
      error.message
    );

    return false;
  }
}


// ======================================================
// AUTH STATUS
// ======================================================

app.get(
  "/api/youtube/auth-status",
  (req, res) => {

    const connected =
      loadYouTubeToken();

    res.json({
      connected: connected
    });
  }
);


// ======================================================
// YOUTUBE ANALYTICS
// ======================================================

app.get(
  "/api/youtube/analytics",
  async (req, res) => {

    try {

      const authenticated =
        loadYouTubeToken();

      if (!authenticated) {

        return res.status(401).json({
          error: "YouTube account is not connected.",
          authUrl:
            "http://localhost:5000/auth/google"
        });
      }


      // --------------------------------------------------
      // ANALYTICS CLIENT
      // --------------------------------------------------

      const youtubeAnalytics =
        google.youtubeAnalytics({
          version: "v2",
          auth: oauth2Client
        });


      // --------------------------------------------------
      // DATE RANGE - LAST 28 DAYS
      // --------------------------------------------------

      const endDate = new Date();

      endDate.setDate(
        endDate.getDate() - 1
      );

      const startDate = new Date();

      startDate.setDate(
        startDate.getDate() - 28
      );

      const formatDate = (date) => {
        return date
          .toISOString()
          .split("T")[0];
      };

      const start =
        formatDate(startDate);

      const end =
        formatDate(endDate);


      // --------------------------------------------------
      // GET YOUTUBE ANALYTICS
      // --------------------------------------------------

      const analyticsResponse =
        await youtubeAnalytics.reports.query({

          ids: "channel==MINE",

          startDate: start,

          endDate: end,

          metrics:
            "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,likes,comments,shares,subscribersGained,subscribersLost"

        });


      const headers =
        analyticsResponse.data.columnHeaders || [];

      const rows =
        analyticsResponse.data.rows || [];

      const analytics = {};


      if (rows.length > 0) {

        headers.forEach(
          (header, index) => {

            analytics[header.name] =
              Number(
                rows[0][index] || 0
              );

          }
        );
      }


      // --------------------------------------------------
      // YOUTUBE DATA API
      // --------------------------------------------------

      const youtube =
        google.youtube({
          version: "v3",
          auth: oauth2Client
        });


      // --------------------------------------------------
      // GET CHANNEL
      // --------------------------------------------------

      const channelResponse =
        await youtube.channels.list({

          part:
            "snippet,statistics,contentDetails",

          mine: true

        });

      const channel =
        channelResponse.data.items?.[0];


      if (!channel) {

        return res.status(404).json({
          error: "No YouTube channel found."
        });
      }


      // --------------------------------------------------
      // CHANNEL DATA
      // --------------------------------------------------

      const channelData = {

        channelId:
          channel.id,

        channelName:
          channel.snippet.title,

        description:
          channel.snippet.description,

        publishedAt:
          channel.snippet.publishedAt,

        thumbnail:
          channel.snippet.thumbnails?.high?.url || "",

        subscribers:
          Number(
            channel.statistics.subscriberCount || 0
          ),

        videos:
          Number(
            channel.statistics.videoCount || 0
          ),

        views:
          Number(
            channel.statistics.viewCount || 0
          ),

        uploadsPlaylistId:
          channel.contentDetails
            .relatedPlaylists
            .uploads
      };


      // --------------------------------------------------
      // GET RECENT VIDEOS
      // --------------------------------------------------

      const playlistResponse =
        await youtube.playlistItems.list({

          part: "snippet",

          playlistId:
            channelData.uploadsPlaylistId,

          maxResults: 10
        });


      const videoIds =
        playlistResponse.data.items
          .map(
            item =>
              item.snippet.resourceId.videoId
          )
          .join(",");


      let videos = [];


      // --------------------------------------------------
      // VIDEO STATISTICS
      // --------------------------------------------------

      if (videoIds) {

        const videosResponse =
          await youtube.videos.list({

            part:
              "snippet,statistics,contentDetails",

            id: videoIds

          });


        videos =
          videosResponse.data.items.map(
            video => ({

              videoId:
                video.id,

              title:
                video.snippet.title,

              thumbnail:
                video.snippet
                  .thumbnails
                  ?.medium
                  ?.url || "",

              publishedAt:
                video.snippet.publishedAt,

              views:
                Number(
                  video.statistics.viewCount || 0
                ),

              likes:
                Number(
                  video.statistics.likeCount || 0
                ),

              comments:
                Number(
                  video.statistics.commentCount || 0
                ),

              duration:
                video.contentDetails.duration
            })
          );
      }


      // --------------------------------------------------
      // RECENT VIDEO TOTALS
      // --------------------------------------------------

      const recentVideoViews =
        videos.reduce(
          (total, video) =>
            total + video.views,
          0
        );

      const recentVideoLikes =
        videos.reduce(
          (total, video) =>
            total + video.likes,
          0
        );

      const recentVideoComments =
        videos.reduce(
          (total, video) =>
            total + video.comments,
          0
        );


      // --------------------------------------------------
      // SEND DATA TO FRONTEND
      // --------------------------------------------------

      res.json({

        channel: channelData,

        summary: {

          subscribers:
            channelData.subscribers,

          totalViews:
            channelData.views,

          totalVideos:
            channelData.videos,

          recentVideoViews:
            recentVideoViews,

          recentVideoLikes:
            recentVideoLikes,

          recentVideoComments:
            recentVideoComments
        },

        analytics: {

          dateRange: {
            startDate: start,
            endDate: end
          },

          views:
            analytics.views || 0,

          watchTimeMinutes:
            analytics.estimatedMinutesWatched || 0,

          averageViewDuration:
            analytics.averageViewDuration || 0,

          averageViewPercentage:
            analytics.averageViewPercentage || 0,

          likes:
            analytics.likes || 0,

          comments:
            analytics.comments || 0,

          shares:
            analytics.shares || 0,

          subscribersGained:
            analytics.subscribersGained || 0,

          subscribersLost:
            analytics.subscribersLost || 0
        },

        recentVideos: videos,

        updatedAt: new Date()
      });

    } catch (error) {

      console.error(
        "YouTube Analytics Error:"
      );

      console.error(
        error.response?.data ||
        error.message
      );

      res.status(500).json({

        error:
          "Failed to fetch YouTube Analytics.",

        details:
          error.response?.data ||
          error.message
      });
    }
  }
);


// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      "================================="
    );

    console.log(
      "Segmento backend started"
    );

    console.log(
      `Backend running on port ${PORT}`
    );

    console.log(
      `Google OAuth: http://localhost:${PORT}/auth/google`
    );

    console.log(
      "================================="
    );
  }
);