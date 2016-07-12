var router = require('./routes.js');
var request = require('request');
var bluebird = require('bluebird');
var _ = require('underscore');
var apiKey = require('../apiKey')

var options = 'location=-36.8670522,119.1957362&radius=500&type=restaurant&name='
var reviewWordsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
var placeSearchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'

var deleteThisLater = 'ChIJN1t_tDeuEmsRUsoyG83frY4'

module.exports = {
	reviewSearch: {
		getReviewWords: function(req, res) {
			// console.log('get place is working')
			// var searchTerm = JSON.parse(req.body.key);
			// console.log('LOOK HERE' + reviewWordsUrl + JSON.parse(req.body.key) + '&key=' + apiKey);
			var rawReviewArray;
			
			request(reviewWordsUrl + JSON.parse(req.body.key) + '&key=' + apiKey, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					rawReviewArray = JSON.parse(body).result.reviews;
					var newArray = _.map(rawReviewArray, function(item) {
						return item.text;
					})
					newArray = newArray.join(' ').toLowerCase().split(' ')
					newArray = _.map(newArray, function(item) {
						return item.replace(/[^a-z]/gi, ' ')
					})
					// console.log(newArray);
					// newArray = newArray.join(' ');
					console.log(newArray.join(' '))
					res.status(200).send(newArray);
				}
			})
		}
	},

	placeSearch: {
		getPlace: function(req, res) {
			console.log(req.body);
			request(placeSearchUrl + options + req.body.key + '&key=' + apiKey, function(error, response, body) {
				if(!error && response.statusCode == 200) {
					var newArray = JSON.parse(response.body).results;
					var newArray = _.map(newArray, function(item) {
						return {name: item.name, id: item.place_id};
					})
					// console.log('still working 12938471-92834', newArray);
					res.send(newArray);
				}
			});		
		}
	}
}