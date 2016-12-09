//var AudioPlayer = require('../lib/audioplayer.js'),
//	Track = require('../lib/track.js'), 
//	mpd = require('mpd');

//var mpdClient = mpd.connect({
//  port: 6600,
//  host: 'localhost',
//});

//var player = new AudioPlayer(mpdClient, mpd, null);

//mpdClient.on('system', function(data){ console.log(data); });
//mpdClient.on('system-update', function(data){ console.log(data); });

//mpdClient.on('ready', function() { 
//  //player.clearQueue();        
//  //player.addSongToQueueByFile('sample.wav');
//    //player.list();  
//    player.play();
//});

var mpd = require('mpd'),
    cmd = mpd.cmd;
var client = mpd.connect({
    port: 6600,
    host: 'localhost',
});
client.on('ready', function () {
    console.log("ready");
    client.sendCommand(cmd("status", []), function (err, msg) {
        if (err) throw err;
        console.log(msg);
    });
});
client.on('system', function (name) {
    console.log("update", name);
});
client.on('system-player', function () {
    client.sendCommand(cmd("status", []), function (err, msg) {
        if (err) throw err;
        console.log(msg);
    });
});
