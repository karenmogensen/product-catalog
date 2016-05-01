/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    var productFlagService = function($http){
        var url = 'http://localhost:3000';

        //Create product flag
        var createProductFlag = function(productFlag){
            return $http.put('/createProductFlag', { 'productFlag' : productFlag } )
                .then( function(response){
                    return response.data;
                });
        };

        //Get product flags from database
        var getProductFlags = function(){
            return $http.get('/getProductFlags')
                .then( function(response){
                    return response.data;
                });
        };

        //Get prodct flag with "productFlagId" from db
        var getProductFlag = function(productFlagId){
            return $http.get('/getProductFlag/' + productFlagId)
                .then( function(response){
                    return response.data;
                });
        };

        //Delete product with "productFlagId" from database
        var deleteProductFlag = function(productFlagId){
            return $http.delete('/productFlag/' + productFlagId)
                .then( function(response){
                    return response.data;
                });
        };

        return {
            getProductFlag: getProductFlag,
            getProductFlags: getProductFlags,
            deleteProductFlag: deleteProductFlag,
            createProductFlag: createProductFlag
        };
    };

    angular
        .module('app')
        .factory('productFlagService', productFlagService);
}());