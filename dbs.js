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
  axios.get(job.data)
  .then(function(response) {
    client.hset(job.id, 'data', response.data, redis.print);
    done();
  })
  .catch(function() {
    console.log('fetch not complete')
  });
}

var createJob = function(url, res) {
  var job = queue.create('request', url).priority('high').attempts(3).removeOnComplete(true).save(function(err) {
    if (err) {
      res.send("There was an error creating your job");
    }
    else {
      res.send("Your job ID is: " + job.id);
      client.hset(job.id, 'data', 'none', redis.print);
    }
  });
}

var getStatus = function(id, res) {
  client.hget(id, 'data', function(err, obj) {
    if (err) {
      res.send(err);
    } else if (obj == null) {
      res.send("This ID doesn\'t exist in the database");
    } else if (obj == 'none') {
      res.send("The job is still in progress");
    } else {
      res.send(obj);
    }
  });
}

queue.process('request', 3, function(job, done) {
//second argument is the number of jobs that can happen concurrently. Smaller the task, the more that can run concurrently
  fetch(job, done);
});

module.exports = {
  createJob,
  getStatus
}
