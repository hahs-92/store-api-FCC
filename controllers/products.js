const getAllProductsStatic = async (req, res) => {
    res.status(200).json({msg: 'products statics'})
}


const getAllProducts = async (req, res) => {
    res.status(200).json({msg: 'products'})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}