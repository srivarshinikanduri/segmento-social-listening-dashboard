# Segmento Social Listening Tool

A sample Social Listening Dashboard developed as part of the Segmento task.

This project is being developed step by step, starting with the dashboard user interface and then adding backend communication, APIs, deployment, and later real social media integrations.

---

## 🎯 Project Objective

The main objective of this project is to build a sample web application for a Social Listening platform.

The dashboard is designed to display and understand social media insights such as:

- Mentions
- Engagement
- Sentiment
- Trending topics
- Platform activity
- Social media trends
- Analytics and visualizations

The application is currently a prototype and will be extended later with real social media data, databases, sentiment analysis, and AI-based features.

---

# 📅 Project Progress

## Day 1 – Social Listening Dashboard UI

On the first day, I developed the initial **Social Listening Dashboard user interface**.

### Work Completed

- Created the Social Listening Dashboard UI.
- Designed KPI cards for important metrics.
- Added social media platform-wise information.
- Added charts and data visualizations.
- Added trending topics and social media activity sections.
- Used sample/mock data for demonstration.
- Made the interface clean and responsive.
- Created the initial React project using Vite.

### Day 1 Technologies

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Recharts

### Day 1 Result

A working sample dashboard interface was created to demonstrate how a Social Listening platform can look and function.

---

# 📅 Day 2 – Frontend, Backend and API Communication

On the second day, I extended the dashboard by developing the **backend and frontend-backend communication**.

### Work Completed

- Created a backend using **Node.js**.
- Used **Express.js** to create the backend server.
- Created a REST API endpoint for dashboard data.
- Added CORS support.
- Added JSON request/response handling.
- Connected the React frontend with the backend API.
- Used `fetch()` in React to request data from the backend.
- Tested the API locally.
- Verified that backend data is displayed in the frontend dashboard.
- Created a Vercel API endpoint for production deployment.
- Deployed the application to Vercel.

### Backend API

Local backend endpoint:
http://localhost:5000/api/dashboard

### ☁️ Deployment
The application has been deployed using **Vercel**.

**Live Application:**  
https://segmento-social-listening-dashboard-pi.vercel.app/

---
# Day 3 – MongoDB Database Setup & Backend Connection

## Objective

The objective of Day 3 was to set up MongoDB as the database for the Social Listening Tool and connect the MongoDB database with the backend server.

## Work Completed

### 1. Database Selection

MongoDB was selected as the database for the Social Listening Tool.

MongoDB is a NoSQL database that stores data in a flexible document-based format.

### 2. MongoDB Atlas Setup

- Created and configured MongoDB Atlas.
- Created a MongoDB Atlas cluster named `SocialListeningCluster`.
- Configured the required database settings.

### 3. Database User Creation

Created a MongoDB database user with the required permissions.

The database user is used to securely authenticate the backend application with MongoDB Atlas.

### 4. MongoDB Connection URI

Generated the MongoDB connection URI from MongoDB Atlas.

The connection URI is used by the backend server to connect to the MongoDB Atlas cluster.

### 5. Environment Configuration

Added the MongoDB connection URI to the backend `.env` file.

```env
MONGODB_URI=your_mongodb_connection_uri

###Workflow
Choose MongoDB
      ↓
Set Up MongoDB Atlas
      ↓
Create MongoDB Cluster
      ↓
Create Database User
      ↓
Generate MongoDB Connection URI
      ↓
Add URI to .env
      ↓
Configure MongoDB in Backend
      ↓
Connect Backend to MongoDB Atlas
      ↓
Verify Successful Connection



Day 4 – YouTube API Integration with MongoDB
Objective

Integrated the YouTube social media platform with the backend using Node.js and Express, and stored YouTube channel metrics in MongoDB Atlas.

Work Completed
Integrated YouTube Data API v3.
Connected YouTube API with the Node.js + Express backend.
Retrieved YouTube channel metrics such as:
Channel Name
Subscribers
Number of Videos
Total Views
Channel ID
Connected the backend to MongoDB Atlas.
Stored the retrieved YouTube data in the social_listening database.
Created the youtube_channels collection.
Used MongoDB updateOne() with upsert to save/update channel data.
Tested the complete API flow successfully.

YouTube Data API
       ↓
Node.js + Express
       ↓
MongoDB Atlas
       ↓
YouTube Channel Data

###Technologies Used
Node.js
Express.js
YouTube Data API v3
MongoDB Atlas
Axios
dotenv
JavaScript

Result
Successfully integrated YouTube → Node.js → MongoDB, with YouTube channel metrics retrieved through the backend and stored in MongoDB for further use in the Social Listening Dashboard.







---

