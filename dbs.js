var axios = require('axios');
var redis = require('redis');
var kue = require('kue');

//init database
var client = redis.createClient();
client.on('connect', function() {
  console.log('Connected to database');
});
client.on('error', function(err) {
  console.log("Redis Error: " + err);
});

//create queue
var queue = kue.createQueue();
queue.on( 'error', function(err) {
  console.log( 'Kue Error: ', err );
});

var fetch = function(job, done) {

}

var createJob = function(url, res) {

}

var getStatus = function(id, res) {

}

queue.process('request', 3, function(job, done) {
//second argument is the number of jobs that can happen concurrently. Smaller the task, the more that can run concurrently

});

module.exports = {
  createJob,
  getStatus
}
