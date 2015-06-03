let mongoose = require('mongoose')

let schema = mongoose.Schema({
  bnbId: String,
  lat: Number,
  lng: Number,
  name: String,
  price: String,
  url: String,
  image: String
})

module.exports = mongoose.model('Listing', schema)
