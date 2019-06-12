var express = require('express');
var router = express.Router();

var data = [5,6,7,8]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: data });
});

router.post('/add', function (req, res, next) {
  // Prepare output in JSON format
  console.log(req.body.message)
  data.push(req.body.message)
  response = {
    data: data,
  };

  console.log(response);
  //res.end(JSON.stringify(response));
});

module.exports = router;
