'use strict';

angular.module('myApp.view1',[])

.controller('View1Ctrl', ['$http', 'APP_CONFIG', function($http, config) {
        $http.get(config.urlMpdWs).then(function (response) {
            var resp = response.data;
        });


        if (typeof (EventSource) !== "undefined") {
            // Yes! Server-sent events support!
            var source = new EventSource(config.urlMpdWs+'/server-events');
            
            source.onmessage = function (event) {
                var datos = event.data;
            };
        } else {
            // Sorry! No server-sent events support..
            console.log('SSE not supported by browser.');
        }

}]);