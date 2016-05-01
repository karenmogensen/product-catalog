/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.adminProductsList", [])
        .controller("adminProductsListController", adminProductsListController);

    //Define controller
    function adminProductsListController($rootScope, $scope, $routeParams, $location, productService)
    {
        $scope.deleteProduct = function(productId){
            var retVal = confirm("Vil du slette produktet ?");
            if( retVal == true ) {
                productService.deleteProduct(productId);
                removeFromProductList(productId);
            }
        };

        var modelProducts = function(data){
            $scope.products = data;
        }

        function removeFromProductList(productId){
            for(var i= 0; i<$scope.products.length; i++) {
                if ($scope.products[i].productId == productId) {
                    $scope.products.splice($scope.products[i], 1);
                }
            }
        }

        //Get products from product service
        productService.getProducts()
            .then(modelProducts);

    }
}());