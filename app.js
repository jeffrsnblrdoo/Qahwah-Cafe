require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Products = require('./servers/models/Products');
const Orders = require('./servers/models/Orders');

const connectDB = require('./servers/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

//Connect to databse
connectDB();

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());


//default route
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'home.html'));
});


//route to fetch products
app.get('/products', async (req, res) => {
    try {
        const data = await Products.find();
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});


//route for handling order submission
app.post('/submitOrders', async (req, res) => {

    try {
        // Extract order data from the request body
        const { name, address, contact, orders, price } = req.body;
        //console.log('Received order data:', { name, address, contact, orders, price });

        // Create a new order document using the Orders model
        const newOrder = new Orders({
            name,
            address,
            contact,
            orders,
            price
        });

        //save the new order document to the db
        await newOrder.save();

        res.status(200).json({ message: 'Order submitted successfully' });
    } catch(error) {
        console.log('Error saving order data: ', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});


//start server
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});