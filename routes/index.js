const express = require('express')
const router = express.Router();
const Product = require('../models/product')


router.post('/addproduct', async (req,res) =>{
    try {
        const product = new Product({
            name : req.body.name,
            description: req.body.description,
            price : req.body.price,
            category: req.body.category
        })

        const savedProduct = await product.save();
        res.json(savedProduct)
    } catch (error) {
        res.statusCode(400).json({message: error.message})
    }
})

router.get('/readAllProducts', async (req,res) =>{
    try {
        const products = await Product.find();
        res.json(products)

    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

router.put('/update/:id', async (req,res) =>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )
        res.json(updatedProduct)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete('/delete/:id', async (req,res) =>{
    try {
        const removeProduct = await Product.findByIdAndDelete(req.params.id)
        res.json(removeProduct)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router