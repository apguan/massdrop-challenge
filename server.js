var express = require('express');
// var router = require('./routes.js');
var { checkStatus, createUrl, welcomeMessage } = require('./controllers.js');

var app = express()
var port = process.env.PORT || 8000;

// app.get('/', router);
app.get('/', welcomeMessage);
app.get('/create/:url', createUrl);
app.get('/status/:id', checkStatus);

app.listen(port, function() {
  console.log('listening to port ' + port);
});
