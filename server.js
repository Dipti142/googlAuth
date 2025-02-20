require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import { OAuth2Client } from "google-auth-library";
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productRoutes');
const ordersRoutes = require('./routes/orderRouter');
import cookieParser from "cookie-parser";



const app = express();

// app.get('/api/auth/google/callback', 
//     passport.authenticate('google', {
//         successRedirect: '/dashboard', // Redirect on success
//         failureRedirect: '/login'     // Redirect on failure
//     })
// );
// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());



// Routes
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/orders', ordersRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

