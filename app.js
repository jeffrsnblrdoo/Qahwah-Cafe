require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Products = require('./servers/models/Products');
const Orders = require('./servers/models/Orders');

const connectDB = require('./servers/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

//Connect to databse
connectDB();

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());

app.use('*.php', createProxyMiddleware({ target: 'http://localhost:80', changeOrigin: true }));


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
        const { id, name, address, contact, orders, total } = req.body;
        //console.log({id, name, address, contact, orders, total })

        // Create a new order document using the Orders model
        const newOrder = new Orders({
            id,
            name,
            address,
            contact,
            orders,
            total
        });

        //save the new order document to the db
        await newOrder.save();

        res.status(200).json({ message: 'Order submitted successfully' });
    } catch(error) {
        console.log('Error saving order data: ', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});


//route to fetch orders
app.get('/submitOrders', async (req, res) => {
    try {
        const data = await Orders.find();
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch(error) {
        console.log(error);
    }
});


//route for deleting orders
app.delete('/submitOrders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    console.log(orderId);

    try {
        //find and delete the order by its ID
        const deleteOrder = await Orders.findByIdAndDelete(orderId);

        if(!deleteOrder) {
            return res.status(404).json({ error: `Order with ID ${orderId} not found` });
        }

        res.json({ message: `Order with ID ${orderId} has been deleted` });
    } catch(error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});


//route for adding new product to the database
app.post('/addProducts', async (req,res) => {
    try {
        const { category, id, name, price, description, image } = req.body;

        const newProduct = new Products({
            category,
            id,
            name,
            price,
            description,
            image
        });

        await newProduct.save();

        res.status(200).json({ message: 'Product added successfully' });
    } catch(error) {
        console.log('Error adding product: ', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});


//route for updating products
app.put('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { category, id, name, price, description, image } = req.body;

    try {
        // Find the product by its ID and update its properties
        const updatedProduct = await Products.findByIdAndUpdate(productId, {
            category,
            id,
            name,
            price,
            description,
            image
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: `Product with ID ${productId} not found` });
        }

        res.json({ message: `Product with ID ${productId} has been updated`, updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});


//route for deleting products
app.delete('/addProducts/:productId', async (req, res) => {
    const productId = req.params.productId;
    console.log(productId);

    try {
        //find and delete the order by its ID
        const deleteProduct = await Products.findByIdAndDelete(productId);

        if(!deleteProduct) {
            return res.status(404).json({ error: `Order with ID ${productId} not found` });
        }

        res.json({ message: `Order with ID ${productId} has been deleted` });
    } catch(error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});


//start server
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});