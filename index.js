const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const cors = require('cors');

dotenv.config();
const app = express();

// CORS configuration to allow localhost:3000 only
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true  // Allow only the frontend running on localhost:3000
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);

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
