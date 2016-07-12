// var _ = require('underscore');

angular.module('reviewCloudApp.reviewCloud', ['reviewCloudApp.searchPlaces'])
	.controller('ReviewCloudController', function($scope, $state, $http, searchId) {
		$scope.reviewsArray = [];
		$scope.noDuplicates;
		$scope.removeWords = ['youd', 'their', 'theirs']
		$scope.currentId = null;
		/////////
		$scope.getCurrentId = function() {
			$scope.getWords(searchId.getId());
		}
		/////////
		$scope.indexOf = function(collection, target) {
			for (var i = 0; i < collection.length; i++) {
				if (collection[i] === target) {
					return 1
				}
			}
			return -1;
		}
		
		$scope.getWords = function(searchTerm) {
			console.log('get words invoked')
			$http({
				method: 'POST',
				url: 'http://localhost:3000/review-cloud',
				data: {key: JSON.stringify(searchTerm)}
			}).then(function(response) {
				// console.log(response);
				$scope.reviewsArray = response;
				$scope.noDuplicates = $scope.eliminateDuplicates(response.data);
				console.log($scope.noDuplicates);	
			})
		}

		$scope.eliminateDuplicates = function(array) {
			var newObj = {};
			for (var i = 0; i < array.length; i++) {
				if ($scope.indexOf($scope.removeWords, array[i]) === -1 && array[i].length > 3) {
					newObj[array[i]] = newObj[array[i]] || 0;
					newObj[array[i]] += 1;
				}
			}
			return newObj;
		}
	});