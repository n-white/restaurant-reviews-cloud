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
					newObj[array[i]].size += 1;
				}
			}
			for (key in newObj) {
				newArr.push(newObj[key]);
			}
			searchId.setCloud(newArr);
			return searchId.getCloud();
		}

		$scope.generateWordCloud = function(cloudObject) {

			var frequency_list = [{"text":"best","size":15},{"text":"hidden","size":45},{"text":"gems","size":15},{"text":"without","size":15},{"text":"hustle","size":15},{"text":"bustle","size":15},{"text":"sydney","size":30},{"text":"cbd ","size":15},{"text":"amazing","size":30},{"text":"food","size":45},{"text":"great","size":15},{"text":"location","size":15},{"text":"only","size":15},{"text":"just","size":15},{"text":"minutes","size":15},{"text":"walk","size":15},{"text":"from","size":15},{"text":"beautiful","size":30},{"text":"harbour ","size":15},{"text":" for","size":15},{"text":"enthusiasts","size":15},{"text":"appreciates","size":15},{"text":"authentic","size":60},{"text":"japanese","size":75},{"text":"food ","size":30},{"text":"every","size":15},{"text":"single","size":15},{"text":"dish","size":30},{"text":"menu","size":15},{"text":"flawlessly","size":15},{"text":"executed","size":15},{"text":"chef s","size":15},{"text":"fine","size":15},{"text":"culinary","size":15},{"text":"skills ","size":15},{"text":"additionally","size":15},{"text":"that","size":45},{"text":"also","size":30},{"text":"aesthetically","size":15},{"text":"pleasing ","size":15},{"text":"they","size":30},{"text":"provide","size":15},{"text":"genuine","size":15},{"text":"customer","size":15},{"text":"service","size":45},{"text":"which","size":15},{"text":"hard","size":15},{"text":"find","size":15},{"text":"restaurants","size":15},{"text":"nowadays ","size":15},{"text":"master","size":15},{"text":"pieces","size":15},{"text":"pyrmont","size":30},{"text":"modern","size":15},{"text":"japanesefood","size":15},{"text":"creativity","size":15},{"text":"chef","size":15},{"text":"kiyo","size":30},{"text":"definitely","size":30},{"text":"recommended ","size":15},{"text":"fresh","size":45},{"text":"ingredients","size":15},{"text":"taste","size":15},{"text":"excellent","size":15},{"text":"favourite ","size":15},{"text":"second","size":15},{"text":"time","size":15},{"text":"partner","size":15},{"text":"visit","size":15},{"text":"since","size":15},{"text":"moving","size":15},{"text":"area","size":15},{"text":"month","size":15},{"text":"truly","size":15},{"text":"love","size":30},{"text":" ambiance","size":15},{"text":"very","size":75},{"text":"calm","size":15},{"text":"relaxing ","size":15},{"text":"noise","size":15},{"text":"level","size":15},{"text":"kept","size":15},{"text":"minimum","size":15},{"text":"thus","size":15},{"text":"being","size":15},{"text":"able","size":15},{"text":"enjoy","size":15},{"text":"good","size":15},{"text":"conversation","size":15},{"text":"while","size":15},{"text":"having","size":15},{"text":"meal","size":15},{"text":" the","size":15},{"text":"gyozas","size":15},{"text":"great ","size":15},{"text":" food","size":15},{"text":"deliciously","size":15},{"text":"attentive ","size":15},{"text":"little","size":15},{"text":"gem ","size":15},{"text":"restaurant","size":15},{"text":"harris","size":15},{"text":"street ","size":15},{"text":"friendly","size":30},{"text":"service ","size":30},{"text":"extensive","size":15},{"text":"sushi","size":15},{"text":"offering","size":15},{"text":"makes","size":15},{"text":"large","size":15},{"text":"number","size":15},{"text":"interesting","size":15},{"text":"entrees","size":15},{"text":"mains ","size":15},{"text":"chopped","size":15},{"text":"wagyu","size":15},{"text":"steak","size":15},{"text":"favorites ","size":15},{"text":"recommended","size":15},{"text":"both","size":15},{"text":"romantic","size":15},{"text":"dinner","size":15},{"text":"with","size":15},{"text":"kids","size":15},{"text":" very","size":15},{"text":"friendly ","size":15},{"text":"always","size":15},{"text":"cater","size":15},{"text":"year","size":15},{"text":"old ","size":15},{"text":"plates ","size":15},{"text":"would","size":15},{"text":"recommend","size":15},{"text":"here","size":15},{"text":"everyone","size":15},{"text":"morden","size":15},{"text":"cuisine ","size":15}];


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











