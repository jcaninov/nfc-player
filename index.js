var Track = require('./lib/track.js');
var PlayerController = require('./lib/players.js');



var tracks = [ new Track("sample", 'Sample Music/sample.wav') ];

var rock = new PlayerController();

 
rock.play(tracks[0]);
