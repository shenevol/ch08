var express = require('express');
var app = express();

var runners = [];

app.get('/', function(req, res) {
	//req is used to accept data from client
	//res is used to pass data to client
	res.header("Access-Control-Allow-Origin", "*");
	res.send(new Date());
});

app.get('/runners', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send(runners);
});

app.post('/service', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	console.log('post ok');
	console.log(runners);
	runners.push('foo');
	res.sendStatus(200);
});

console.log('node server listen on port: 3000');
app.listen(3000);
