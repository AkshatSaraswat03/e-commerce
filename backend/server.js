const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send("hello...")
})

app.use('/api/products', productRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log("server running on port 5000"))
