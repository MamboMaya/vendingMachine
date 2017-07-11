const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  // id: {type: Objectid, required: true},
  description: {type: String, required: true},
  cost: {type: Number, required: true},
  quantity: {type: Number, required: true},
  // createdAt: {type: Date, required: true, date: Date.now},
  // updatedAt: {type: Date, required: true, date: Date.now}
})

const purchaseSchema = new mongoose.Schema({
  createdAt: {type: Date, required: true},
  items: {type: Array,
  ref: 'Item'}
})

const customerSchema = new mongoose.Schema({
  money: {type: Number, required: true},
  purchases: [purchaseSchema]
})

const machineSchema = new mongoose.Schema({
  items: {type: Array,
    ref: 'Item'},
    money: {type: Number, required: true, default: 500},
    purchases: [purchaseSchema]
  })

const Item = mongoose.model('Item', itemSchema)
const Customer = mongoose.model('Customer', customerSchema)
const Purchase = mongoose.model('Purchase', purchaseSchema)
const Machine = mongoose.model('Machine', machineSchema)

module.exports = {
  Item: Item,
  Customer: Customer,
  Purchase: Purchase,
  Machine: Machine
}
