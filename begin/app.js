var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send(new Date());
});

console.log('node server listen on port: 3000');
app.listen(3000);
