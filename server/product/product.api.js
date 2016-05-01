/**
 * Created by Karen on 01-05-2016.
 */
var Product = require('./product.model'),
    Price = require('./price.model');

var product = {

    getAll: function(req, res, next){
        Product.find(function(err, products){
            if(err) console.error;
            res.json(products);
        });
    },

    create: function(req, res, next){
        var newProd = new Product(req.body.product);
        var prod = new Product(newProd);
        var newPrices = req.body.productPrices;
        for(var i=0; i < newPrices.length; i++)
        {
            var newPrice = new Price({
                price: newPrices[i].price,
                currency:newPrices[i].currency,
                type: newPrices[i].type
            });
            prod.prices.push(newPrice);
        }
        prod.save(function(err, products){
            if(err) console.error;
            res.json(products);
        });
    },

    read: function(req, res, next){
        Product.findOne({ 'productId': req.params.productId }, function (err, product) {
            if (err) console.error;
            res.json(product);
        });
    },

    update: function(req, res, next){
        var newProd = new Product(req.body.product);
        var updateData = newProd.toObject();
        delete updateData._id;
        Product.update({productId: newProd.productId}, updateData, {upsert:true}, function(err, data){
            if(err) console.error;
            else res.json("Saved: " + data);
        });
    },

    delete: function(req, res, next){
        Product.findOneAndRemove({'productId': req.params.productId}, function(err, data) {
            if (err) console.error;
            else res.json("Deleted:" + data);
        });
    }
};

// Return the object
module.exports = product;