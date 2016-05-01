/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Product flag model
var schema = {
    productFlagId: Number,
    name: String,
    image: String
};

//Export product flag model
module.exports = mongoose.model("ProductFlag", schema);