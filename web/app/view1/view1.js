'use strict';

angular.module('myApp.view1',[])

.controller('View1Ctrl', ['$http', 'APP_CONFIG', '$scope', function($http, config, $scope, createChangeStream, LiveSet) {
    var self = this;
    $scope.datos = [],
    self.tagValue = "pugli",
    self.response = "12",
    $scope.tags = [];
    self.tag = 'artist';
        
    self.init = function () {
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource(config.urlMpdWs + '/update-stream');
            source.addEventListener('message', function (e) {
                $scope.datos = JSON.parse(event.data);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            source.addEventListener('error', function (e) {
                console.log("EventSource Error: " + event);
            });
        } else {
            // Sorry! No server-sent events support..
            console.log('SSE not supported by browser.');
        }
        self.getTags();
    };
        
    self.getTags = function () {
        var uri = config.urlMpdWs + "/get-tags";
        $http.get(uri).then(function (response) {
            $scope.tags = response.data;
        });
    };

    self.search = function () {
        var uri = config.urlMpdWs + "/" + self.tag + "/" + self.tagValue;
        $http.get(uri).then(function (response) {
            self.response = response.data;
        });
    };

    self.onKeyEnter = function(e){
        if (e.charCode == 13) {
            self.search();   
        }
    };

    self.init();

}]);