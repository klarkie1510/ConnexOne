var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/time', function(req, res, next) {
  res.status(200).send({
    epoch: Math.round(new Date().getTime() / 1000)
  })
});

module.exports = router;

