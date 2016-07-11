var router = require('./routes.js');
var request = require('request');
var bluebird = require('bluebird');
var _ = require('underscore');
var apiKey = require('../apiKey')

var options = 'location=-33.8670522,151.1957362&radius=500&type=restaurant&name=cruise&key'
var reviewWordsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=' + apiKey;
var placeSearchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + options + '=' + apiKey


module.exports = {
	reviewSearch: {
		getReviewWords: function(req, res) {
			// console.log('get place is working')
			var rawReviewArray;
			
			request(reviewWordsUrl, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					rawReviewArray = JSON.parse(body).result.reviews;
					var newArray = _.map(rawReviewArray, function(item) {
						return item.text;
					})
					newArray = newArray.join(' ').toLowerCase().split(' ')
					newArray = _.map(newArray, function(item) {
						return item.replace(/[^a-z]/gi, '')
					})
					console.log(newArray);
				}
				res.status(200).send(newArray);
			})
			// .then(function(data) {
			// 	console.log('139481-23947823');
			// 	res.status(200).send(newArray);
			// })
		}
	},

	placeSearch: {
		getPlace: function(req, res) {
			console.log('21398471029347');		
		}
	}
}