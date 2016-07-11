var router = require('express').Router();
var controllers = require('./controllers.js');

router.route('/place')
	// .get(controllers.placeSearch.getPlace)
	.get(controllers.placeSearch.getReviewWords);

module.exports = router;