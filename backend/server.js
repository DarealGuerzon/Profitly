const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/batches', require ('./routes/batches'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/batches', require('./routes/batches'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Profitly API running' });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: 'Validation Error', details: Object.values(err.errors).map(e => e.message) });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, error: 'Duplicate Entry' });
  }
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});