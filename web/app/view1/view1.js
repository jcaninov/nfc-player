'use strict';

angular.module('myApp.view1',[])

.controller('View1Ctrl', ['$http', 'APP_CONFIG', '$scope', function($http, config, $scope) {
    $scope.datos = [],
	$scope.grid = {},
	$scope.grid.selectAll = false,
	$scope.rfid = "",
	$scope.tags = [],
    $scope.tagValue = "pugli",
    $scope.tag = 'artist',
	$scope.player = {};
        
    this.init = function() {
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
        this.get('tags');
		this.get('rfid');
    };

	this.get = function(item) {
        var uri = config.urlMpdWs + "/get-" + item;
        $http.get(uri).then(function (response) {
            $scope[item] = response.data;
        });
    };
	$scope.player.get = this.get;

    $scope.search = function() {
        var uri = config.urlMpdWs + "/search/" + $scope.tag + "/" + $scope.tagValue;
        $http.get(uri).then(function (response) {
        });
    };
        
    $scope.savePlaylist = function(){
		if ($scope.datos.length <= 0 || $scope.rfid == "") return;
        var postData = {
			id: $scope.rfid,
			items: getDataToSave($scope.datos)
			};
		var uri = config.urlMpdWs + "/save-playlist";
        $http.post(uri, postData).then(function (response) {
        });
    };

    $scope.onKeyEnter = function(e){
        if (e.charCode == 13) {
            this.search();   
        }
    };

	$scope.onSelectAll = function(state) {
		$scope.datos.forEach(function (item) {
			item.selected = state;
		});
	};
		
	var getDataToSave = function(datos) {
		var response = [];
		datos.forEach(function (item) {
			if (item.selected) {
				response.push(item);
			}
		});
		return response;
	};

    this.init();

}]);