const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose')
const Item = require('./models/itemModel.js');
const Table = require('./models/tableModel.js');
const crypto = require("crypto")

require('dotenv').config('./.env');


const app = express();

app.use(express.json());
app.use(cors())

// Table Handeling

app.get("/tables", async (req, res) => {
    const results = await Table.find()  
    res.send(results)
});

app.post("/add/table", async (req, res) => {
    const { label } = req.body

    try {
        const table = await Table.create({ label })
        res.status(200).json(table)
    } catch (e) {
        res.status(400).json({ error: e.message })

    }
})

// get order of table by id

app.get("/orders/:id", async (req, res) => {
    const id = req.params.id
    try {
        const results = await Table.findById(id)
        res.send(results.orders).status(200)
    } catch (e) {
        res.status(400).json({ error: e.message })
        
    }
});

// Add an item to table
app.patch('/order', async(req, res) => {

    const {id, amount, tableId} = req.body
    const order = {id: id, amount: amount, nanoId: crypto.randomUUID()}

    try {
        await Table.update(
            { _id: tableId }, 
            {   busy: true,
                $push: {orders: order}})
        res.status(200).json({message: 'order Added'})
    }catch(e) {
        res.status(400).json({error: e.message})
    }

})

// Pay a.k.a clear all orders from table
app.patch('/pay', async(req, res) => {

    const {tableId} = req.body

    try {
        await Table.findOneAndUpdate(
            { _id: tableId }, 
            {   busy: false,
                $set: {orders: []}})
        res.status(200).json({message: 'table Cleared'})
    }catch(e) {
        res.status(400).json({error: e.message})
    }

})

app.patch('/delete/order', async(req, res) => {

    const {orderId, tableId} = req.body

    try {
        await Table.updateOne(
            { _id: tableId }, 
            {$pull: {orders: {nanoId : orderId}}},
            {multi: true}
            ).limit(1)
        res.status(200).json({message: 'order Deleted'})
    }catch(e) {
        res.status(400).json({error: e.message})
    }

})


// Items Handeling

app.get("/items", async (req, res) => {
    const results = await Item.find()
    res.send(results)
});

app.post("/add/item", async (req, res) => {
    const { category, image, name, price } = req.body

    try {
        const item = await Item.create({ category, image, name, price })
        res.status(200).json(item)
    } catch (e) {
        res.status(400).json({ error: e.message })

    }
})



const PORT = process.env.PORT || 5000;

// connect to db
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT} \nDataBase Connected`);
        });
    })
    .catch((e) => {
        console.log(e)
    })