const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

// Middleware pour valider les id src: mongoodb
function validateObjectId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'ID invalide.' });
    }
    next();
}


router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// recherhce de produt
router.get('/', async (req, res) => {
    try{
        const { keyword } = req.query;

        const filters = {};

        if(keyword){
            filters.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
            ];
        }
        
        const products = await Product.find(filters);
        res.json(products);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
