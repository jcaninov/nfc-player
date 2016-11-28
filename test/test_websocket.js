var AudioPlayer = require('../lib/audioplayer.js'),
    Track = require('../lib/track.js'), 
    net = require('net'),
    mpd = require('mpd'),
    Mopidy = require('mopidy');

var wSocket = net.connect({ port: 6600,  host: 'localhost'}, function(ev) {
    console.log("Connected!");
    //console.log(this);
  });

/*
#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ');
    console.log(error);
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

client.connect('ws://localhost:6600/', 'echo-protocol');
*/