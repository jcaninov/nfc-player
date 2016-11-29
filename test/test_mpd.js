var AudioPlayer = require('../lib/audioplayer.js'),
	Track = require('../lib/track.js'), 
	mpd = require('mpd');

var mpdClient = mpd.connect({
  port: 6600,
  host: 'localhost',
});

var player = new AudioPlayer(mpdClient, mpd, null);

mpdClient.on('system', function(data){ console.log(data); });
mpdClient.on('system-update', function(data){ console.log(data); });

mpdClient.on('ready', function() { 
  //player.clearQueue();        
  //player.addSongToQueueByFile('sample.wav');
    //player.list();  
    player.play();
});


