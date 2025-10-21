const express = require('express');
const router = express.Router();

const Item = require('../models/item');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ date: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
});

router.post('/', async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const item = await newItem.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: 'Error creating item', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error updating item', error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        await item.deleteOne();
        res.json({ success: true, message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting item', error: err.message });
    }
});

module.exports = router;
