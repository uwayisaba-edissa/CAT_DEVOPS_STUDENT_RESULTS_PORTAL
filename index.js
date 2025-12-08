// index.js - Student Results Portal (Static Server with Local Storage)
const express = require("express");
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Catch-all route to serve index.html for single-page app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`✅ Student Results Portal running on http://localhost:${PORT}`);
    console.log(`📚 Login with: admin / admin123`);
    console.log(`💾 All data is stored in browser's local storage`);
});

// Graceful shutdown
const gracefulShutdown = () => {
    console.log("\n👋 Shutting down gracefully...");
    server.close(() => {
        process.exit(0);
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = app;
