var validUrl = require('valid-url');
var { createJob, getStatus } = require('./dbs.js');

var checkStatus = function (req, res) {
  getStatus(req.params['id'], res);
}

var createUrl = function (req, res) {
  var url = 'http://' + req.params['url'];
  //isWebUri is just a convenience method that combines isHttpUri and isHttpsUri to accept most common real-world URLs.
  if (validUrl.isWebUri(url)) {
    createJob(url, res);
  } else {
    console.log('invalid URL');
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
