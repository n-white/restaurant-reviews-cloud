// var _ = require('underscore');

angular.module('reviewCloudApp.reviewCloud', ['reviewCloudApp.searchPlaces'])
	.controller('ReviewCloudController', function($scope, $state, $http, searchId) {
		$scope.reviewsArray = [];
		$scope.noDuplicates;
		$scope.removeWords = ['youd', 'their', 'theirs']
	
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
			var newArr = [];
			for (var i = 0; i < array.length; i++) {
				if ($scope.indexOf($scope.removeWords, array[i]) === -1 && array[i].length > 3) {
					newObj[array[i]] = newObj[array[i]] || {'text': array[i], 'size': 0};
					newObj[array[i]].size += 15;
				}
			}
			for (key in newObj) {
				newArr.push(newObj[key]);
			}
			searchId.setCloud(newArr);
			return $scope.generateWordCloud();
		}

		$scope.generateWordCloud = function() {

			var frequency_list = searchId.getCloud();


	    var color = d3.scale.linear()
	            .domain([100, 20, 15, 10, 6, 5, 4, 3, 2, 1, 0])
	            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

	    d3.layout.cloud().size([800, 300])
	            .words(frequency_list)
	            .rotate(10)
	            .fontSize(function(d) { return d.size; })
	            .on("end", draw)
	            .start();

	    function draw(words) {
	        d3.select("body").append("svg")
	                .attr("width", 850)
	                .attr("height", 350)
	                .attr("class", "wordcloud")
	                .append("g")
	                // without the transform, words words would get cutoff to the left and top, they would
	                // appear outside of the SVG area
	                .attr("transform", "translate(320,200)")
	                .selectAll("text")
	                .data(words)
	                .enter().append("text")
	                .style("font-size", function(d) { return d.size + "px"; })
	                .style("fill", function(d, i) { return color(i); })
	                .attr("transform", function(d) {
	                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	                })
	                .text(function(d) { return d.text; });
	    }

		}

	});











