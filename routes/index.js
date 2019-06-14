var express = require('express');
var router = express.Router();

var data = [
   { text: 'Hello, world', author: 'Miles', date: '13-06-19', time: '15:23', posX: 0, posY: 0 }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Post-it!', data: data });
});

router.post('/add', function (req, res, next) {
  // Prepare output in JSON format
  console.log(req.body)
  data.push(req.body)
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

function generateMessage(message) {
}

module.exports = router;
