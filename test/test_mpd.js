var AudioPlayer = require('./lib/audioplayer.js'),
	Track = require('../lib/track.js'), 
	mpd = require('../mpd');

var mpdClient = mpd.connect({
  port: 6600,
  host: 'localhost',
});

console.log("OK => Mpd connected");

var AudioPlayer = new AudioPlayer(mpdClient, mpd, null);

console.log("OK => New Audioplayer instance created");

mpdClient.on('ready', function() { 
  AudioPlayer.play(new Track("sample", 'Sample Music/sample.wav'));
  console.log("OK =>  Audioplayer Play method called");
});


