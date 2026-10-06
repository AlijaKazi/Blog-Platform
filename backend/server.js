const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Force Google DNS for Node.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');  // Add this line

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/blogs', blogRoutes);  // Add this line

mongoose.connect('mongodb+srv://alijakazi12005:Alija%401405@cluster0.mogy2km.mongodb.net/blog-platform?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5001, () => console.log('Server running on port 5001'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
