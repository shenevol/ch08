var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var db = {
  'finishers': [
    {
      'fname': 'John',
      'lname': 'Smith',
      'gender': 'm',
      'time': '25:31',
      'pic': ' '
    },
    {
      'fname': 'Justin',
      'lname': 'Jones',
      'gender': 'm',
      'time': '25:31',
      'pic': ' '
    },
    {
      'fname': 'Mary',
      'lname': 'Brown',
      'gender': 'f',
      'time': '26:01',
      'pic': ' '
    },
    {
      'fname': 'Frank',
      'lname': 'Jones',
      'gender': 'm',
      'time': '26:08',
      'pic': ' '
    },
    {
      'fname': 'Bob',
      'lname': 'Hope',
      'gender': 'm',
      'time': '26:38',
      'pic': ' '
    },
    {
      'fname': 'Jane',
      'lname': 'Smith',
      'gender': 'f',
      'time': ' 28:04',
      'pic': ' '
    },
    {
      'fname': 'Ryan',
      'lname': 'Rice',
      'gender': 'm',
      'time': '28:24',
      'pic': ' '
    },
    {
      'fname': 'Jacob',
      'lname': 'Zimmy',
      'gender': 'm',
      'time': '29:24',
      'pic': ' '
    }
  ]
};

app.get('/', function(req, res) {
    //req is used to accept data from client
    //res is used to pass data to client
    res.header('Access-Control-Allow-Origin', '*');
    res.send(new Date());
});

app.get('/finishers', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(db);
});

app.post('/finishers', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');

    var finisherData = {
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        time: req.body.finMin + ':' + req.body.finSec
    };
    db.finishers.push(finisherData);

    res.sendStatus(200);
});

console.log('node server listen on port: 3000');
app.listen(3000);
