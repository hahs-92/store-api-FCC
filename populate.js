//CONFIG
const {config }= require('./config/config')
//DB
const connectDB = require('./db/connect')
//MODELS
const Product = require('./models/product')
//PRODUCTS JSON
const jsonProducts = require('./products.json')

const MONGO_URI = config.mongoURI


const start = async () => {
    try {
        await connectDB(MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('success')

        //cerrar el proceso
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

start()
//node populate