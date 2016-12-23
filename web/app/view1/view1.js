'use strict';

angular.module('myApp.view1',[])

.controller('View1Ctrl', ['$http', 'APP_CONFIG', function($http, config) {
        var self = this;
        self.datos = [],
        self.tagValue = "pugli",
        self.response = "12",
        self.tag = 'artist';
        
        if (typeof (EventSource) !== "undefined") {
            // Yes! Server-sent events support!
            var source = new EventSource(config.urlMpdWs+'/update-stream');
            //source.onmessage = function (event) {
            //    self.response = JSON.parse(event.data);
            //};

            source.addEventListener('message', function (e) {
                self.datos = JSON.parse(event.data);
            }, false);
            
            source.addEventListener('open', function (e) {
  // Connection was opened.
            }, false);
            
            source.addEventListener('error', function (e) {
                if (e.readyState == EventSource.CLOSED) {
    // Connection was closed.
                }
            }, false);

        } else {
            // Sorry! No server-sent events support..
            console.log('SSE not supported by browser.');
        }

        self.search = function () {
            var uri = config.urlMpdWs + "/" + self.tag + "/" + self.tagValue;
            $http.get(uri).then(function (response) {
                self.response = response.data;
            });
        };

}]);