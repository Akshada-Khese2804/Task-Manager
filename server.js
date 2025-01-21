const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const authRoutes = require('./routes/auth');  
const taskRoutes = require('./routes/tasks'); 
const dotenv = require('dotenv');  

dotenv.config();

const app = express();

app.use(cors());  
app.use(express.json());  

app.use('/api/auth', authRoutes);  
app.use('/api/tasks', taskRoutes);  
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/task-manager';  
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
  });
