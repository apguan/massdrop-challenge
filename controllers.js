var validUrl = require('valid-url');
var { createJob, getStatus } = require('./dbs.js');

var checkStatus = function (req, res) {
  getStatus(req.params['id'], res);
}

var createUrl = function (req, res) {
  var url = 'http://' + req.params['url'];
  console.log(req.params)
  if (validUrl.isUri(url)) {
    console.log(url);
    // res.send(url)
    createJob(url, res);
  } else {
    res.send('invalid URL format. Ex: \'www.facebook.com\'');
  }
}

var welcomeMessage = function(req, res) {
  res.send('To begin, please add your job URL to the endpoint');
}

module.exports = {
  checkStatus,
  createUrl,
  welcomeMessage
}
