const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api')
const Machine = require('./db/schema').Machine
const Customer = require('./db/schema').Customer

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/items')
app.use(bodyParser.urlencoded({extended: false}))

app.use(apiRoutes)

app.listen(3000, function(){
  console.log('GOOD TO GO!!!!')
})


let machine = new Machine()
machine.money = 500
machine.purchases = []
machine.save()

let customer = new Customer()
customer.money = 5000
customer.save()
