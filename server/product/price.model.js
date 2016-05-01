/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Price Schema
var schema = {
    price: String,
    currency: String,
    type: String,
    fromDate: Date,
    toDate: Date
};

//Export price schema
module.exports = mongoose.model("Price", schema);