var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.listen((process.env.PORT || 8080));

app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hi! Madan Here. How are you?');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// respond to post calls from facebook
app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;
    if (event.message && event.message.text) {
      var incomingText = event.message.text;
      console.log('You sent the message', incomingText);
      sendTextMessage(sender, "Text received, echo: "+ incomingText.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  var access_token ='EAAQo1ecZCQhUBAN6amiKZAdRnZBbyqGf6NIpKkajT2e8EAZClDMdXZAfplsM8vRP5IK3hWWumLEUUUdtnPZBZAbcpHj4HWDm0snPLZBdYpzCKFS0t02kTwzcSdzhzRwdj3PESmNZBgdKS75iCh7VokfA9rpBkdnG1KIIppQPVzeTISH2OZCNZAPgNwI';
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:access_token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}