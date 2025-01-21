const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors'); 

dotenv.config();

const app = express();

//connexion a mongo
connectDB();

//midleware
app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      allowedHeaders: ['Content-Type'], 
    })
  );
  
//route

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur node en cour sur le port ${PORT}`)
});