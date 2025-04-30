const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { 
  cors: { 
    origin: 'https://real-time-news-app-02.onrender.com',
    methods: ['GET', 'POST']
  }
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Define mockNews globally
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

// WebSocket: Listen for category subscriptions and send data accordingly
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('subscribe', (category) => {
    socket.join(category);
    console.log(`Client subscribed to category: ${category}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Push mock news every 5 seconds
const pushMockNews = () => {
  mockNews.forEach(news => {
    io.to(news.category).emit('news', [news]);
  });
};
setInterval(pushMockNews, 5000);

// API Route for fetching news
app.get('/api/news', (req, res) => {
  const category = req.query.category;
  if (!category) {
    res.json(mockNews);
  } else {
    res.json(mockNews.filter(news => news.category === category));
  }
});

// IMPORTANT: use process.env.PORT
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
