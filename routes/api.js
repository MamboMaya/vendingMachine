const express = require('express')
const router = express.Router()
const Item = require('../db/schema').Item
const Customer = require('../db/schema').Customer
const Purchase = require('../db/schema').Purchase
const Machine = require('../db/schema').Machine


router.post('/api/vendor/items', function(req, res){
  // let machine = new Machine()
  // machine.money = 500
  // machine.purchases = []
  // machine.save()
  let item = new Item()
  item.description = 'Coke'
  item.cost = 65
  item.quantity = 5
  item.save()
  .then(function(item){
    res.json(item)
  })
  .catch(function(err){
    res.status(418).json(err)
  })
})


router.get('/api/customer/items', function(req, res){
  Item.find()
  .then(function(items){
    res.json(items)
  })
  .catch(function(err){
    res.status(418).json(err)
  })
})

router.post('/api/customer/:_id/purchases', function(req, res){
  Customer.findOne()
  .then(function(Customer){
    console.log(Customer)
  Item.findOne({'_id': req.params._id})
  .then(function(selection){
    console.log(selection)
    if (Customer.money >= selection.cost) {
      Customer.money = Customer.money - selection.cost //update customer money
      Purchase.createdAt = Date.now()
      selection.quantity = selection.quantity - 1 //update item quantity
      // Purchase.items.push(selection) //add this purchase to purchased items array
      Machine.money += selection.cost //add money to total in machine
      Customer.save()
      selection.save()
      // Purchase.save()
      res.send('Thank you for your purchase!')
    } else {
      res.send('Sorry. You dont not have enough money for this item.')
    }
  })
  .catch(function(err){
    console.log(err)
    res.send('Sorry, this item is no longer available. Please choose a different item.')
  })
})
})



module.exports = router
