/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose');

//Category Schema
var schema = {
    categoryId: Number,
    name: String,
    description: String,
    image: String,
    parentCatId: Number,
    sortOrder: Number,
};

//Export Schema
module.exports = mongoose.model("Category", schema);