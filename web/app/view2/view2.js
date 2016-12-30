'use strict';

angular.module('myApp.view2', [])

.controller('View2Ctrl', ['$http', 'APP_CONFIG', '$scope', function($http, config, $scope) {
    $scope.player = {};
	$scope.player.playlistId = "123213DEPR",
	$scope.player.queue = [];

    this.init = function() {
    };

	$scope.player.get = function(item) {
        var uri = config.urlMpdWs + "/player/get-" + item;
        $http.get(uri).then(function (response) {
            $scope.player[item] = response.data;
        });
    };

	$scope.player.action = function(action) {
		var uri = config.urlMpdWs + "/player/" + action;
        $http.get(uri);
	};

	$scope.player.loadPlaylist = function() {
		var uri = config.urlMpdWs + "/player/load-playlist/" + $scope.player.playlistId;
        $http.get(uri);
	};

	$scope.player.clearQueue = function() {
		var uri = config.urlMpdWs + "/player/clear-queue";
        $http.get(uri);
		$scope.player.queue = [];
		//$scope.player.get('queue');
	};


    this.init();

}]);