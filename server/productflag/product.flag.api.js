/**
 * Created by Karen on 01-05-2016.
 */
var ProductFlag = require('./product.flag.model.js');

var productFlag = {

    getAll: function(req, res, next){
        ProductFlag.find(function(err, productFlags){
            if(err) console.error;
            res.json(productFlags);
        });
    },

    read: function(req, res, next){
        ProductFlag.findOne({ 'productFlagId': req.params.ProductFlagId }, function (err, productFlag) {
            if (err) console.error;
            res.json(productFlag);
        });
    },

    update: function(req, res, next){
        var newProductFlag = new ProductFlag(req.body.productFlag);
        var updateData = newProductFlag.toObject();
        delete updateData._id;
        ProductFlag.update({categoryId: newProductFlag.productFlagId}, updateData, {upsert:true}, function(err, data){
            if(err) console.error;
            else res.json("Saved: " + data);
        });
    },

    create: function(req, res, next){
        var newProductFlag = new ProductFlag(req.body.productFlag);
        newProductFlag.save( function(err, data){
            if(err) console.error;
            else res.json("Saved: " + data);
        });
    },

    delete: function(req, res, next){
        ProductFlag.findOneAndRemove({'productFlagId': req.params.productFlagId}, function(err, data) {
            if (err) console.error;
            else res.json("Deleted:" + data);
        });
    }

};

// Return the object
module.exports = productFlag;