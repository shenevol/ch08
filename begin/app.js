var express = require('express');
var app = express();

app.get('/', function(req, res) {
	//req is used to accept data from client
	//res is used to pass data to client
	res.header("Access-Control-Allow-Origin", "*");
	res.send(new Date());
});

app.post('/service', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	console.log('post ok');
	console.log(req);

	res.redirect('http://localhost:8080/ch8.html?status=ok#add');
	//use ? to pass para to client 

});

console.log('node server listen on port: 3000');
app.listen(3000);
