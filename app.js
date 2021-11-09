const express = require('express')
//CONFIG
const { config } = require('./config/config')
//DB
const connectDB = require('./db/connect')
//ERRORS MIDLEWARES
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')


const PORT = config.port || 5005
const MONGO_URI = config.mongoURI

//INITIALIZE
const app = express()


//MIDDLEWARE
app.use(express.json())

//ROUTES
app.get('/',(req, res) => {
    res.send(
        '<h1>Store API</H1><a href="/api/v1/products">Products route</a>'
    )
})

app.use(notFound)
app.use(errorHandler)


const start = async () => {
    try {
        await connectDB(MONGO_URI)
        app.listen(PORT, console.log(`Server is listening port ${PORT}`))
    } catch (error) {
        console.error(error)
    }
}

start()
