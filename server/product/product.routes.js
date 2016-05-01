/**
 * Created by Karen on 01-05-2016.
 */
var product = require('./product.api.js'),
    express = require('express'),
    productRouter = express.Router();

// Get all products
productRouter.get('/getProducts', product.getAll);

// Create a new product
productRouter.put('/createProduct', product.create);

// Read, update and delete one product
productRouter.route('/product/:productId')
    .get(product.read)
    .put(product.update)
    .delete(product.delete);

module.exports = productRouter;