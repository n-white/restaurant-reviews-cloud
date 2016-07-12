// var _ = require('underscore');

angular.module('reviewCloudApp.reviewCloud', ['reviewCloudApp.searchPlaces'])
	.controller('ReviewCloudController', function($scope, $state, $http, searchId) {
		$scope.reviewsArray = [];
		$scope.noDuplicates;
		// $scope.removeWords = ['youd', 'their', 'theirs']
	
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
	            .range(["#676767", "#676767", "#676767", "#676767", "#0099ff", "#00ffcc", "#99ff33", "#ccff33", "#ffcc00", "#ff9933", "#ff3300", "#ff0000"]);

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

		$scope.removeWords = ['​it​','​I​','​you​','​he​','​they​','​we​','​she​','​who​','​them​','​me​','​him​','​one​','​her​','​us​','​something​','​nothing​','anything',
		'himself','everything','someone','themselves','everyone','itself','anyone','myself','food','another','any','anybody','anyone',
		'anything','both','each','other','either','everybody','everyone','everything','few','he','her','her','herself','him','himself','his','i',
		'it','its','itself','little','many','me','mine','more','most','much','my','myself','neither','no','one','nobody','none','nothing','another','other','others','our',
		'ours','ourselves','several','she','some','somebody','someone','something','that','their','theirs','them','themselves','these','they','this',
		'those','us','we','what','whatever','which','whichever','who','whoever','whom','womever','whose','you','your','yours','youre','yourself','yourselves','up',
		'so','out','just','now','how','then','more','also','here','well','only','very','even','back','there','down','still','in','as','too','when','never',
		'really','most','be','have','do','say','get','make','go','know','take','see','come','think','look','want','give','use','find','tell',
		'ask','work','seem','feel','try','leave','call','up','so','out','just','now','how','then','more','also','here','well','only','very',
		'really','most','be','have','do','say','get','make','go','know','take','see','come','think','​look​','​want​','​give​','​use​','find','tell',
		'​even​','​back​','​there​','​down​','​still​','​in​','​as​','​too​','​when​','​never​','​ask​','​work​','​seem​','​feel​','​try​','​leave​','​call','​up​','so​','out​','just​','now​','how​','then​','more​','also​','here​','well​','only​','very​',
		'even​','back​','there​','down​','still​','in​','as​','too​','when​','never​','really​','most​','of​','in​','to​','for​','with​',
		'on​','at​','from​','by​','about​','as​','into​','like​','through​','after​','over​','between​','out​','against​','during​','without​','before​','under​','around​','among​',
		'and​','that​','but​','or​','as​','into​','like​','through​','after​','over​','between​','out​','against​','during​','without​','before​','under​',
		'around​','among​','and​','that​','but​','or​','as​','if​','when​','than​','because​','while​','where​','after​','so​','though​','since​','until​',
		'whether​','before​','although​','nor​','like​','once​','unless​','now​','two​','first​','last​','three​','next​','million​','four​','five​','second​',
		'six​','third​','billion​','hundred​','thousand​','seven​','eight​','ten​','nine​','dozen​','fourth​','twenty​','fifth​','thirty​','yes','oh','yeah',
		'no','hey','hi','hello','ah']

		

	});













