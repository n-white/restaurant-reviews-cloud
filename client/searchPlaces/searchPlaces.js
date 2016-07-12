angular.module('reviewCloudApp.searchPlaces', [])
	.controller('SearchPlacesController', function($scope, $state, $http) {
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
	});