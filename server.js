var http = require('http');
var express = require('express');
var app = express();

app.listen((process.env.PORT || 8080));

app.get('/', function (req, res) {
    res.send('1360571908');
});

//http.createServer(function (req, res) {
//    
//    res.writeHead(200, { 'Content-Type': 'text/html' });
//    res.end('Hello, world! Madan');
//    
//}).listen(process.env.PORT || 8080);

//var express = require('express');
//var bodyParser = require('body-parser');
//var request = require('request');
//var app = express();

//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
//app.listen((process.env.PORT || 8080));
//// Server frontpage
//app.get('/', function (req, res) {
//    res.send('This is TestBot Server');
//});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});