const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const User = require('../models/user'); // ✅ Import User model

// ✅ Get blogs by type
router.get("/type/:type", async (req, res) => {
  try {
    const regex = new RegExp(`^${req.params.type}$`, "i"); // Case-insensitive match
    const blogs = await Blog.find({ type: regex });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a single blog by ID
router.get('/detail/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog by ID' });
  }
});

// ✅ Get all blogs for a user
router.get('/:userEmail', async (req, res) => {
  try {
    const blogs = await Blog.find({ userEmail: req.params.userEmail }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// ✅ Add new blog (only one POST route)
router.post('/', async (req, res) => {
  const { userEmail, title, content, type } = req.body;

  if (!userEmail || !title || !content || !type) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ email: userEmail }); // ✅ Get username
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newBlog = new Blog({
      userEmail,
      title,
      content,
      type,
      author: user.username // ✅ Set author to username
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// ✅ Update blog by ID
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// ✅ Delete blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

module.exports = router;
