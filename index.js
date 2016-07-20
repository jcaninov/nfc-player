//https://jsfiddle.net/71osymop/

var Track = require('./lib/track.js');
var PlayerController = require('./lib/players.js');
var Enums = require('./lib/enums.js');
var Rockola = require('./lib/rockola.js');
var mpd = require('mpd'),
    cmd = mpd.cmd;

var mpdClient = mpd.connect({
  port: 6600,
  host: 'localhost',
});

mpdClient.on('ready', function() {
  console.log("ready");
  //debugger;
  RunRockola();
});

mpdClient.on('system', function(name) {
  console.log("update", name);
});

mpdClient.on('system-player', function() {
  mpdClient.sendCommand(cmd("status", []), function(err, msg) {
    if (err) throw err;
    console.log(msg);
  });
});

/*

var tracks = [ new Track("sample", 'Sample Music/sample.wav','','',Enums.trackType.audio) ];

var rock = new PlayerController();

 
rock.play(tracks[0]);

rock.pause();

rock.stop();
*/


function RunRockola(){
  //.replace(/\\/g,"\\\\");
  var tracks = [ new Track("sample", 'Sample Music/sample.wav') ];
  //var tracks = [ new Track("sample", "sample.wav") ];
  //var tracks = [ new Track("This is music"),  new Track("oooo","http://ooo.com")];
  //Logger.echo(JSON.stringify(tracks[0], null, 2));

  var rock = new Rockola();
  rock.addTrack(tracks);

  rock.play();

  //rock.pause();
  //rock.next();
  return;
}

