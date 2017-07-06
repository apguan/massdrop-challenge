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
