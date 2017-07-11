## Massdrop-Challenge

Create a job queue whose workers fetch data from a URL and store the results in a database.  The job queue should expose a REST API for adding jobs and checking their status / results.


## Example

User submits [www.google.com](www.google.com) to your endpoint.  The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result.  The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com

Use any tech you want, put code in a gist or on GitHub and send it to David Westrom.

## How To Run


Make sure Redis is installed on your machine. To install, run in the terminal

`brew install Redis`

Then to run the redis server

`redis-server`

Default `port: 6379`

### Server

Make sure Node is installed on your machine. To install, run

`brew install node`

Install Node dependencies

`npm install`

Once the redis server is running, run this in your terminal

`npm run local`

In your browser, go to `localhost:8000`

##### End points:
`/create/your url`

`/status/status-code-you-received-from-worker-response`
