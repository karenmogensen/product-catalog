/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    var app = angular.module('app', ['ngRoute', 'ngFileUpload', 'app.adminProduct', 'app.adminProductsHierarchy', 'app.adminProductsList', 'app.categoryadmin', 'app.uploadImages', 'ui.tree']);

    app.config(['$routeProvider', function ($routeProvider) {
        //Setting up routing
        $routeProvider
            .when('/admin', {
                templateUrl: 'app/admin/views/admin.products.hierarchy.html',
                controller: 'adminProductsHierarchyController'
            })
            .when('/admin/productslist', {
                templateUrl: 'app/admin/views/admin.products.list.html',
                controller: 'adminProductsListController'
            })
            .when('/admin/createProduct/:categoryId', {
                templateUrl: 'app/admin/views/admin.product.html',
                controller: 'adminProductController'
            })
            .when('/admin/updateProduct/:productId', {
                templateUrl: 'app/admin/views/admin.product.html',
                controller: 'adminProductController'
            })
            .when('/admin/createCategory/:parentCategoryId', {
                templateUrl: 'app/admin/views/admin.category.html',
                controller: 'categoryAdminController'
            })
            .when('/admin/updateCategory/:categoryId', {
                templateUrl: 'app/admin/views/admin.category.html',
                controller: 'categoryAdminController'
            })
            .when('/admin/uploadProductImages', {
                templateUrl: 'app/admin/views/admin.upload.images.html',
                controller: 'uploadImagesController'
            })
    }])
}());