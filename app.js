require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'home.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});