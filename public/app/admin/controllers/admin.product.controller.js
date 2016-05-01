/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.adminProduct", [])
        .controller("adminProductController", adminProductController);

    //Define controller
    function adminProductController($rootScope, $scope, $routeParams,$location, productService, categoryService, productFlagService)
    {
        $scope.title = 'Opret produkt';
        $scope.create = true;

        //If update situation initialize and set title
        if($routeParams.categoryId == undefined)
        {
            $scope.title = 'Opdater produkt';
            $scope.create = false;
        }

        if($routeParams.productId == undefined)
        {
            $scope.categoryFields = [{id: 'cat1'}];
            $scope.priceFields = [{id: 'price1'}];
        }

        $scope.saveProduct = function(){
            if($scope.create)createProduct();
            else updateProduct();
        }

        //Create a new product
        function updateProduct(){
            //Get array of categories
            var categories = [];
            for(var i= 0; i < $scope.categoryFields.length; i++)
            {
                if(($scope.categoryFields[i].selected) != undefined)
                {
                    categories.push($scope.categoryFields[i].selected.name);
                }
            }

            var productFlags = [];
            for(var i= 0; i < $scope.productFlagFields.length; i++)
            {
                if(($scope.productFlagFields[i].selected) != undefined)
                {
                    productFlags.push($scope.productFlagFields[i].selected.name);
                }
            }
            //Create prices
            var productPrices = [];
            for(var i=0; i< $scope.priceFields.length; i++)
            {
                productPrices.push({
                    "price": $scope.priceFields[i].price,
                    "currency": $scope.priceFields[i].currencyData.selected.name,
                    "type": $scope.priceFields[i].typeData.selected.name,
                    "fromDate": $scope.priceFields[i].fromDate,
                    "toDate": $scope.priceFields[i].toDate});
            }
            $scope.product.categories = categories;
            $scope.product.productFlags = productFlags;
            $scope.product.prices = productPrices;

            //Update product
            productService.updateProduct( $scope.product ).
            then(
                //Go back to list or hierarchy
                window.history.back()
            )
        };

        //Create a new product
        function createProduct(){
            //Get array of categories
            var categories = [];
            for(var i= 0; i < $scope.categoryFields.length; i++)
            {
                if(($scope.categoryFields[i].selected) != undefined)
                {
                    categories.push($scope.categoryFields[i].selected.name);
                }
            }

            var productFlags = [];
            for(var i= 0; i < $scope.productFlagFields.length; i++)
            {
                if(($scope.productFlagFields[i].selected) != undefined)
                {
                    productFlags.push($scope.productFlagFields[i].selected.name);
                }
            }

            //Create new product json object
            var product = {
                "productId": $rootScope.nextProductId,
                "name": $scope.product.name,
                "shortDescription": $scope.product.shortDescription,
                "longDescription": $scope.product.longDescription,
                "categories": categories,
                "productFlags": productFlags,
                "image": $scope.product.image,
                "state": $scope.product.state
            };
            //Create prices
            var productPrices = [];
            for(var i=0; i< $scope.priceFields.length; i++)
            {
                productPrices.push({
                    "price": $scope.priceFields[i].price,
                    "currency": $scope.priceFields[i].currencyData.selected.name,
                    "type": $scope.priceFields[i].typeData.selected.name,
                    "fromDate": $scope.priceFields[i].fromDate,
                    "toDate": $scope.priceFields[i].toDate});
            }
            //Call product service to create the new product
            productService.createProduct( product, productPrices ).
            then( productService.getProducts().
                then(
                //Return to product list/hierarchy
                window.history.back()
                )
            );
        };

        //-----------------Setting up state field---------------------------------

        $scope.states = [{state:'Aktiv'}, {state:'Inaktiv'}];

        //---------------------Setting up category fields-------------------------
        //Add category field
        $scope.addCategory = function(category) {
            var newItemNo = $scope.categoryFields.length+1;
            $scope.categoryFields.push({'id':'cat' + newItemNo, 'options': $scope.categoryOptions});
        };

        //Remove category field
        $scope.removeCategory = function() {
            var lastItem = $scope.categoryFields.length-1;
            if ($scope.categoryFields.length > 1) {
                $scope.categoryFields.splice(lastItem);
            }
        };

        //If update mode - setup category fields with data
        function modelCategoryFields()
        {
            $scope.categoryFields = [];
            if(!$scope.create) {
                for (var i = 0; i < $scope.product.categories.length; i++) {
                    $scope.categoryFields.push({'id': 'cat' + i});
                    $scope.categoryFields[i].options = $scope.categoryOptions;
                    $scope.categoryFields[i].selected = {'name': $scope.product.categories[i]};
                }
            }
            $scope.categoryFields.push({'id':'cat'+ $scope.categoryFields.length});
            $scope.categoryFields[$scope.categoryFields.length-1].options = $scope.categoryOptions;
        };

        //---------------------Setting up product flag fields-------------------------
        //Add product flag field
        $scope.addProductFlag = function(productFlag) {
            var newItemNo = $scope.productFlagFields.length+1;
            $scope.productFlagFields.push({'id':'flag' + newItemNo, 'options': $scope.productFlagOptions});
        };

        //Remove product flag field
        $scope.removeProductFlag = function() {
            var lastItem = $scope.productFlagFields.length-1;
            if ($scope.productFlagFields.length > 1) {
                $scope.productFlagFields.splice(lastItem);
            }
        };

        //If update mode - setup product flag fields with data
        function modelProductFlagFields()
        {
            $scope.productFlagFields = [];
            $scope.productFlagOptions = [{name: 'Nyhed'}, {name: 'Godt køb'}];
            if(!$scope.create) {
                for (var i = 0; i < $scope.product.productFlags.length; i++) {
                    $scope.productFlagFields.push({'id': 'flag' + i});
                    $scope.productFlagFields[i].options = $scope.productFlagOptions;
                    $scope.productFlagFields[i].selected = {'name': $scope.product.productFlags[i]};
                }
            }
            $scope.productFlagFields.push({'id':'flag'+ $scope.productFlagFields.length});
            $scope.productFlagFields[$scope.productFlagFields.length-1].options = $scope.productFlagOptions;
        };

        //---------------------Setting up price fields-------------------------

        $scope.addNewPrice = function() {
            var newItemNo = $scope.priceFields.length+1;
            $scope.priceFields.push({'id':'price'+newItemNo});
        };

        $scope.removePrice = function() {
            var lastItem = $scope.priceFields.length-1;
            if ($scope.priceFields.length > 1) {
                $scope.priceFields.splice(lastItem);
            }
        };

        //Setup prices fields with data
        function modelPriceFields()
        {
            $scope.priceFields = [];
            $scope.priceOptions = [{name: 'Normalpris'}, {name: 'Tilbudspris'}, {name: 'Udsalgspris'}];
            $scope.currencyOptions = [{name: 'Kroner'}, {name: 'Euro'}, {name: 'Pund'}];
            if(!$scope.create) {
                for (var i = 0; i < $scope.product.prices.length; i++) {
                    $scope.priceFields.push({'id': 'flag' + i});
                    $scope.priceFields[i].typeData = {
                        selected: {'name': $scope.product.prices[i].type},
                        options: $scope.priceOptions
                    };
                    $scope.priceFields[i].currencyData = {
                        selected: {'name': $scope.product.prices[i].currency},
                        options: $scope.currencyOptions
                    };
                    $scope.priceFields[i].price = $scope.product.prices[i].price;
                    $scope.priceFields[i].currency = $scope.product.prices[i].currency;
                }
            }
            $scope.priceFields.push({'id':'flag'+ $scope.priceFields.length});
            $scope.priceFields[$scope.priceFields.length-1].typeData = {options: $scope.priceOptions};
            $scope.priceFields[$scope.priceFields.length-1].currencyData = {options: $scope.currencyOptions};
            console.log($scope.priceFields);
        };

        //Set product model object
        var modelProduct = function(product)
        {
            $scope.product = product;
        };

        //Set categories - used in drop down list
        var modelCategories = function(categories)
        {
            $scope.categoryOptions = [];
            for (var i = 0; i < categories.length; i++) {
                $scope.categoryOptions[i]={'name': categories[i].name};
            }
            modelCategoryFields();
            modelProductFlagFields();
            modelPriceFields();
        };

        //Set product flags - used in drop down list
        var modelProductFlags = function(productFlags)
        {
            $scope.productFlags = productFlags;
        };

        //Get product
        if(!$scope.create) {
            productService.getProduct($routeParams.productId)
                .then(modelProduct);
        }

        //Get categories
        categoryService.getCategories().
        then(modelCategories);

        //Get product flags
        productFlagService.getProductFlags().
        then(modelProductFlags);
    }
}());