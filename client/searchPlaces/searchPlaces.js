angular.module('reviewCloudApp.searchPlaces', [])
	.controller('SearchPlacesController', function($scope, $state, $http, searchId) {
		$scope.placesArray = [];
		$scope.getPlaces = function(searchTerm) {
			console.log(searchTerm);
			$http({
				method: 'POST',
				url: 'http://localhost:3000/place-search',
				data: {key: JSON.stringify(searchTerm)}
			}).then(function(res) {
				console.log('places search worked', res);
				$scope.placesArray = res;
			})
		}
		$scope.changePage = function() {
			$state.go('reviewCloudState');
		}
		$scope.updateId = function(idValue) {
			searchId.searchId(idValue);
		}
	})
	.factory('searchId', function() {
		currentId = {id: null};
		idObj = {};
		idObj.searchId = function(idValue) {
			currentId.id = idValue;
			console.log('updated to :', currentId.id)
		}
		idObj.getId = function() {
			return currentId.id;
		}
		return idObj;
	});