// backend/server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));


app.use(cors());
app.use(express.json());

// WebSocket: Listen for category subscriptions and send data accordingly
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('subscribe', (category) => {
    socket.join(category);  // Join the room for the specific category
    console.log(`Client subscribed to category: ${category}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Simulate sending mock news data every 5 seconds
const pushMockNews = () => {
  // Sample mock data
  const mockNews = [
    {
      title: 'Breaking Tech News: New AI Revolution!',
      description: 'AI technology is evolving at an exponential rate.',
      category: 'Tech',
      timestamp: new Date(),
    },
    {
      title: 'Sports Update: Football Championship Tonight!',
      description: 'Don’t miss the exciting match tonight.',
      category: 'Sports',
      timestamp: new Date(),
    },
    {
      title: 'Business News: Stock Market Hits Record High',
      description: 'The stock market saw a major uptick this week.',
      category: 'Business',
      timestamp: new Date(),
    },
  ];

  // Emit news data to all clients subscribed to the categories
  mockNews.forEach(news => {
    io.to(news.category).emit('news', [news]);
  });
};

// Simulate pushing mock news every 5 seconds
setInterval(pushMockNews, 5000);

// API Route for fetching news (GET /api/news)
app.get('/api/news', (req, res) => {
  const category = req.query.category;  // Get category from query parameter
  
  // You can mock the response or query your database here
  if (!category) {
    res.json(mockNews);  // If no category is provided, send all news
  } else {
    res.json(mockNews.filter(news => news.category === category)); // Filter by category
  }
});

server.listen(5000, () => console.log('Server running on port 5000'));
