require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const connectDB = require('./servers/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

//Connect to databse
connectDB();

app.use(express.static(path.join(__dirname, './public')));

//default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'home.html'));
});

//start server
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});