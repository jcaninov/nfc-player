var EventEmitter = require('events'),
  mpd = require('mpd'),
  AudioPlayer = require('./lib/audioplayer.js'),
  NfcReader = require('./lib/nfc_reader.js'),
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
  debugger;
  RegisterEvents();
  var nfcReader = new NfcReader();
  //nfcReader.send(null);
  Eventos.emit(ev.playTrack, new Track("sample", 'Sample Music/sample.wav'));  
});


mpdClient.on('system', function(name) {
  console.log("[system] update", name);
});

mpdClient.on('system-player', function() {
  mpdClient.sendCommand(cmd("status", []), function(err, msg) {
    if (err) throw err;
    var data = Util.parseData(msg);
    console.log("[system-player]");    
    console.log(data);

    /*
    [system-player]
    { volume: '100',
      repeat: '0',
      random: '0',
      single: '0',
      consume: '0',
      playlist: '177140',
      playlistlength: '1',
      xfade: '0',
      mixrampdb: '0.000000',
      mixrampdelay: '1.#QNAN0'
      state: 'play',
      song: '0',
      songid: '46055',
      time: '0:1',
      elapsed: '0.000',
      bitrate: '0',
      audio: '44100:32:1' }
    */
  });
});

mpdClient.on('system-playlist', function() {
  mpdClient.sendCommand(cmd("status", []), function(err, msg) {
    if (err) throw err;
    //console.log("[system-playlist] "+ msg);
    var data = Util.parseData(msg);
    console.log("[system-playlist]");
    console.log(data.state);

    /*
    [system-playlist]
    { volume: '-1',
      repeat: '0',
      random: '0',
      single: '0',
      consume: '0',
      playlist: '11
      playlistlengt
      xfade: '0',
      mixrampdb: '0
      mixrampdelay:
      state: 'play'
      song: '0',
      songid: '4605
      time: '0:0',
      elapsed: '0.0
      bitrate: '0'
    }
    */
  });
});
/**/
function RegisterEvents(){
  AudioPlayer.registerEvents();
}

