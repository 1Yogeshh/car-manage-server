const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.urlencoded({
  extended:true
}))
// CORS configuration to allow localhost:3000 only and support credentials (cookies, auth tokens)
app.use(cors({
  origin: 'http://localhost:3000', // Allow only the frontend running on localhost:3000
  credentials: true, // Allow credentials like cookies or Authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify which headers are allowed in requests
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});
