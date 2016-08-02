var EventEmitter = require('events'),
  mpd = require('mpd'),
  AudioPlayer = require('./lib/audioplayer.js'),
  Track = require('./lib/track.js'), 
  Enums = require('./lib/enums.js'), 
  Util = require('./lib/common.js');
var Eventos = new EventEmitter(),
  ev = Enums.events,
  cmd = mpd.cmd;

 
var mpdClient = mpd.connect({
  port: 6600,
  host: 'localhost',
});

var AudioPlayer = new AudioPlayer(mpdClient, mpd, Eventos);

mpdClient.on('ready', function() { 
  //debugger;
  RegisterEvents();

  Eventos.emit(ev.playTrack, new Track("sample", 'Sample Music/sample.wav'));  
});


mpdClient.on('system', function(name) {
  console.log("[system] update", name);
});

mpdClient.on('system-player', function() {
  mpdClient.sendCommand(cmd("status", []), function(err, msg) {
    if (err) throw err;
    console.log("[system-player] "+ msg);
  });
});

mpdClient.on('system-playlist', function() {
  mpdClient.sendCommand(cmd("status", []), function(err, msg) {
    if (err) throw err;
    debugger;
    console.log("[system-playlist] "+ msg.state);
  });
});
/**/
function RegisterEvents(){
  AudioPlayer.registerEvents();
}

