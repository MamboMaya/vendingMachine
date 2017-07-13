const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api')
const Machine = require('./db/schema').Machine
const Customer = require('./db/schema').Customer

mongoose.Promise = require('bluebird')
const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/items'
mongoose.connect(mongoURL)
app.use(bodyParser.urlencoded({extended: false}))

app.use(apiRoutes)


const port = process.env.PORT || 3000

app.listen(port, function(){
  console.log('We are listening on port' + port)
})
