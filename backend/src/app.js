const express = require("express");
const cors = require("cors");

// Import Routes

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Library Management System API",
    // Remove the non-existent auth endpoint references
    status: "Backend is running. Auth is handled by the frontend.",
  });
});

// Note: Your middleware (authMiddleware.js) is correct and ready
// for when you start building your book and borrowing API routes.

// API Routes

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
