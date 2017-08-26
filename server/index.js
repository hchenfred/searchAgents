var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});

