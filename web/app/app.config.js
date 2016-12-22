'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        //$locationProvider.hashPrefix('!');
        
        // use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        
        $routeProvider
            .when('/view1', {
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl'
                })
            .when('/view2', {
                templateUrl: 'view2/view2.html',
                controller: 'View2Ctrl'
                })
        //    .when('/', {
        //    templateUrl : 'partials/home.html',
        //    controller : mainController
        //})
            .otherwise({ redirectTo: '/view1' });
    }])
.constant('APP_CONFIG', {
    urlMpdWs: 'http://localhost:3000', 
    dbName: 'ascrum' 
    
});
