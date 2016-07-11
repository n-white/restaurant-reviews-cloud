var router = require('express').Router();
var controllers = require('./controllers.js');

router.route('/place-search')
	.get(controllers.placeSearch.getPlace);

router.route('/review-cloud')
	.get(controllers.reviewSearch.getReviewWords);

module.exports = router;