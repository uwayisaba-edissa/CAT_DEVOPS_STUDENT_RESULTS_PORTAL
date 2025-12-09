const express = require('express');
const app = express();

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Results routes
app.get('/results', (req, res) => {
  res.status(200).json({ 
    success: true,
    data: []
  });
});

app.get('/results/threshold', (req, res) => {
  const { percentage } = req.query;
  
  // Validate percentage
  if (percentage && (isNaN(percentage) || percentage < 0 || percentage > 100)) {
    return res.status(400).json({ error: 'Invalid percentage value' });
  }
  
  const threshold = percentage ? parseInt(percentage) : 75;
  
  res.status(200).json({ 
    success: true,
    threshold,
    data: []
  });
});

// Student routes
app.get('/students', (req, res) => {
  res.status(200).json({ 
    success: true,
    data: []
  });
});

app.post('/students', (req, res) => {
  res.status(201).json({ 
    success: true,
    message: 'Student created'
  });
});

module.exports = app;
