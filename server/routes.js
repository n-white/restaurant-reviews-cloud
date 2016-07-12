var router = require('express').Router();
var controllers = require('./controllers.js');

router.route('/place-search')
	.post(controllers.placeSearch.getPlace);

router.route('/review-cloud')
	.post(controllers.reviewSearch.getReviewWords);

module.exports = router;