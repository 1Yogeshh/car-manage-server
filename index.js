// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());

// Alternatively, you can specify allowed origins like so:
 app.use(cors({
   origin: 'http://localhost:3000'
 }));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

module.exports = app;

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})
