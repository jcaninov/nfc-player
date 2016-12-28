'use strict';

angular.module('myApp.view1',[])

.controller('View1Ctrl', ['$http', 'APP_CONFIG', '$scope', function($http, config, $scope) {
    var self = this;
    $scope.datos = [],
    $scope.playlistId = "asdasdiu12312m3l1k23j",
	$scope.grid = {},
	//$scope.grid.selectAll = false,
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
        var uri = config.urlMpdWs + "/search/" + self.tag + "/" + self.tagValue;
        $http.get(uri).then(function (response) {
            self.response = response.data;
        });
    };
        
    self.savePlaylist = function(){
		if ($scope.datos.length <= 0 || $scope.playlistId == "") return;
        var postData = {
			id: $scope.playlistId,
			items: getDataToSave($scope.datos)
			};
		var uri = config.urlMpdWs + "/save-playlist";
        $http.post(uri, postData).then(function (response) {
            self.response = response.data;
        });
    };


    self.onKeyEnter = function(e){
        if (e.charCode == 13) {
            self.search();   
        }
    };

	self.onSelectAll = function(state) {
		$scope.datos.forEach(function (item) {
			item.selected = state;
		});
	};
		
	var getDataToSave = function (datos) {
		var response = [];
		datos.forEach(function (item) {
			if (item.selected) {
				response.push(item);
			}
		});
		return response;
	};

    self.init();


}]);