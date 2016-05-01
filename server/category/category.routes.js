/**
 * Created by Karen on 01-05-2016.
 */
var category = require('./category.api.js'),
    express = require('express'),
    categoryRouter = express.Router();

// Get all categories
categoryRouter.get('/getCategories', category.getAll);

// Create, Read, Update, Delete one category
categoryRouter.route('/category/:categoryId')
    .get(category.read)
    .put(category.update)
    .delete(category.delete);

module.exports = categoryRouter;