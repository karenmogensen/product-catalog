/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.categoryadmin", [])
        .controller("categoryAdminController", categoryAdminController);

    //Define controller
    function categoryAdminController($rootScope, $scope, $routeParams, $location, categoryService)
    {
        $scope.parentCatId = $routeParams.parentCategoryId;

        //---------------Setup title---------------
        $scope.title = "Opret ny varegruppe";

        if($scope.parentCatId == undefined){
            $scope.title = "Opdater varegruppe";
        }
        if($scope.parentCatId == 0)
        {
            $scope.title = "Opret ny top varegruppe";
        }

        //---------------Setup category - if update
        var modelCategory = function(data){
            $scope.category = data;
            //Get the name of the parent category if any
            $scope.parentCatId = $scope.category.parentCatId;
            if($scope.parentCatId != 0){
                getParentCategory();
            }
        }

        var modelParentCategory = function(data){
            $scope.parentCategory = data;
        }
        //Save product - either create a new or update an existing
        $scope.saveCategory = function(){
            //If sub category set parent category id
            var parentCategoryId = 0;
            if($scope.parentCategory != undefined){
                parentCategoryId = $scope.parentCategory.categoryId;
            }
            //Create new category json object
            var category = {
                "categoryId": $scope.categoryId,
                "parentCatId": parentCategoryId,
                "name": $scope.category.name,
                "description": $scope.category.description,
                "image": $scope.category.image
            };
            //Call category service to save new category
            categoryService.saveCategory( category ).
            //Return to product list
            then($location.path( "/admin" ));
        };

        //Get parent category - name used
        function getParentCategory(){
            categoryService.getCategory($scope.parentCatId).
            then(modelParentCategory);
        }

        //If category id is defined it is update mode
        if($routeParams.categoryId != undefined){
            $scope.categoryId = $routeParams.categoryId;
            $scope.mode = "update";
            categoryService.getCategory($scope.categoryId).
            then(modelCategory);
        }

        //If parent category id is defined it is create mode
        if($routeParams.parentCategoryId != undefined){
            $scope.categoryId = $rootScope.nextCategoryId;
            $scope.mode = "create";
            getParentCategory();
        }
    }
}());