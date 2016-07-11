var router = require('./routes.js');
var request = require('request');
var bluebird = require('bluebird');
var _ = require('underscore');
var apiKey = require('../apiKey')

var searchUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=' + apiKey;


module.exports = {
	placeSearch: {
		getReviewWords: function(req, res) {
			// console.log('get place is working')
			var rawReviewArray;
			
			request(searchUrl, function(error, response, body) {
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
		},
		getPlace: function(req, res) {

		}
	}
}