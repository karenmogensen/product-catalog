/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose'),
    priceSchema = require('./price.model').schema,
    Schema = mongoose.Schema;

//Product Schema
var schema = {
    productId: String,
    name: String,
    shortDescription: String,
    longDescription: String,
    categories: [{type:String}],
    productFlags: [{type:String}],
    prices: [priceSchema],
    image: String,
    state: String
};

//Export product schema
module.exports = mongoose.model("Product", schema);