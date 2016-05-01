/**
 * Created by Karen on 01-05-2016.
 */
var upload = require('./upload.api.js'),
    express = require('express'),
    multiparty = require('connect-multiparty'),
    uploadRouter = express.Router();

uploadRouter.post('/upload/product/images', multiparty(), upload.productImages );

module.exports = uploadRouter;