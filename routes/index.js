var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: `Express`, content:`App listening on port ${process.env.PORT || '3000'}` });
  res.json({message:`App listening on port ${process.env.PORT || '3000'}`})
});

module.exports = router;
