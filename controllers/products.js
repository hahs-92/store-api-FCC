//MODELS
const Product = require('../models/product')

const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte'
}


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
    const { sort, fields, numericFilters } = req.query
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const queryObject = {}
    const skip = (page - 1) * limit

    if(numericFilters) {
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`)

        // console.log(filters)

        const options = ['price','rating']
        filters = filters.split(',').forEach((item) => {
            const [field,operator, value ] = item.split('-')

            if(options.includes(field)) {
                queryObject[field] = { [operator]: Number(value)}
            }
        })
    }

    let result = Product.find(queryObject ? queryObject : req?.query)

    if(sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if(fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }


    //paginacion
    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}