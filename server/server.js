// server.js
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

// 👇 Declare mockNews globally
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

// WebSocket logic
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('subscribe', (category) => {
    socket.join(category);
    console.log(`Client subscribed to category: ${category}`);

    // 🚀 When client subscribes, send current news immediately
    const filteredNews = mockNews.filter(news => news.category === category);
    socket.emit('news', filteredNews);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Push new mock news every 5 seconds
setInterval(() => {
  const newMockNews = mockNews.map(news => ({
    ...news,
    timestamp: new Date()
  }));

  newMockNews.forEach(news => {
    io.to(news.category).emit('news', [news]);
  });
}, 5000);

// REST API to get news
app.get('/api/news', (req, res) => {
  const category = req.query.category;
  if (!category) {
    res.json(mockNews);
  } else {
    res.json(mockNews.filter(news => news.category === category));
  }
});

server.listen(5000, () => console.log('Server running on port 5000'));
