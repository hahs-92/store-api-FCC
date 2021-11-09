//MODELS
const Product = require('../models/product')


const getAllProductsStatic = async (req, res) => {
    const {search} = req.query

    const optionsQuery = {}

    if(search) {
        optionsQuery.name = { $regex: search, $options: 'i'}
    }

    const products = await Product.find(optionsQuery)
    res.status(200).json({products, nbHits: products.length})
}


const getAllProducts = async (req, res) => {
    const products = await Product.find(req?.query)
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}