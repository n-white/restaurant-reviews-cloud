angular.module('reviewCloudApp', ['ui.router',
	'reviewCloudApp.searchPlaces',
	'reviewCloudApp.reviewCloud'
	])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('searchPlacesState', {
			url: '/searchplacesurl',
			templateUrl: 'searchPlaces/searchPlaces.html',
			controller: 'SearchPlacesController'
		})
		.state('reviewCloudState', {
			url: '/reviewcloudurl',
			templateUrl: 'reviewCloud/reviewCloud.html',
			controller: 'ReviewCloudController'
		})
});