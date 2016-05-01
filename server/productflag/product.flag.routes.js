/**
 * Created by Karen on 01-05-2016.
 */
var productFlag = require('./product.flag.api.js'),
    express = require('express'),
    productFlagRouter = express.Router();

// Get all product flags
productFlagRouter.get('/getProductFlags', productFlag.getAll);

// Create product flag
productFlagRouter.put('/createProductFlag', productFlag.create);

// Get, update, delete one product flag
productFlagRouter.route('/productFlag/:productFlagId')
    .get(productFlag.read)
    .put(productFlag.update)
    .delete(productFlag.delete);

module.exports = productFlagRouter;