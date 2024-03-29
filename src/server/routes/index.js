var express = require('express');
var router = express.Router();

var Filter = require('bad-words'),
  filter = new Filter();

var data = [
   { text: 'Hello, world', author: 'Miles', date: '13-06-19', time: '15:23', posX: 200, posY: 200 }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Post-it!', data: data });
});

router.post('/add', function (req, res, next) {
  // Prepare output in JSON format
  let postItData = req.body
  postItData.text = filter.clean(postItData.text);
  data.push(postItData)
  response = {
    data: data,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

router.get('/data', function(req, res, next) {
  response = { data: data }
  res.end(JSON.stringify(response));
});

module.exports = router;
