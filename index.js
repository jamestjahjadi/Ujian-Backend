const express = require('express')
const BodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 4202
const app = express()
const db = require('./connection/index')
const {productRouter,storeRouter,inventoryRouter} = require('./router')


db.connect(err => {
    if (err) throw err
    console.log('Server Intiation Success')
})

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/product',productRouter)
app.use('/store',storeRouter)
app.use('/inventory',inventoryRouter)


app.listen(PORT, console.log(`Welcome to port ${PORT}`))