/**
 * Created by Karen on 01-05-2016.
 */
var Category = require('./category.model.js');

var category = {

    getAll: function(req, res, next){
        Category.find(function(err, categories){
            if(err) console.error;
            res.json(categories);
        });
    },

    read: function(req, res, next){
        Category.findOne({ 'categoryId': req.params.categoryId }, function (err, category) {
            if (err) console.error;
            res.json(category);
        });
    },

    update: function(req, res, next){
        var newCat = new Category(req.body.category);
        var updateData = newCat.toObject();
        delete updateData._id;
        Category.update({categoryId: newCat.categoryId}, updateData, {upsert:true}, function(err, data){
            if(err) console.error;
            else res.json("Saved: " + data);
        });
    },

    delete: function(req, res, next){
        Category.findOneAndRemove({ 'categoryId': req.params.categoryId }, function (err, category) {
            if (err) console.error;
            res.json(category);
        });
    }

};

// Return the object
module.exports = category;