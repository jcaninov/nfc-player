var Mopidy = require('mopidy'),
net = require('net');

var get = function (key, object) {
    return object[key];
};

var printTypeAndName = function (model) {
    console.log(model.__model__ + ": " + model.name);
    // By returning the playlist, this function can be inserted
    // anywhere a model with a name is piped in the chain.
    return model;
};

var trackDesc = function (track) {
    return track.name + " by " + track.artists[0].name +
        " from " + track.album.name;
};

var printNowPlaying = function () {
    // By returning any arguments we get, the function can be inserted
    // anywhere in the chain.
    var args = arguments;
    return mopidy.playback.getCurrentTrack()
        .then(function (track) {
            console.log("Now playing:", trackDesc(track));
            return args;
        });
};

var queueAndPlay = function (playlistNum, trackNum) {
    playlistNum = playlistNum || 0;
    trackNum = trackNum || 0;

console.log("--- Call queueAndPlay");

    mopidy.playlists.getPlaylists()
        // => list of Playlists
        .fold(get, playlistNum)
        // => Playlist
        .then(printTypeAndName)
        // => Playlist
        .fold(get, 'tracks')
        // => list of Tracks
        .then(mopidy.tracklist.add)
        // => list of TlTracks
        .fold(get, trackNum)
        // => TlTrack
        .then(mopidy.playback.play)
        // => null
        .then(printNowPlaying)
        // => null
        .catch(console.error.bind(console))  // Handle errors here
        // => null
        .done();                       // ...or they'll be thrown here
};

var webSoquet = net.connect({ port: 6600,  host: 'localhost'}, function(ev) {
    console.log(">>>> Connected!");
    //console.log(this);
    //callMopidy();
});
//webSoquet.on('data', (data) => { console.log(data.toString()); webSoquet.end(); });
webSoquet.on('end', () => {
  console.log('<<<< Disconnected from server');
});

function callMopidy()
{
	var mopidy = new Mopidy({ 
		autoConnect: true, 
		webSocketUrl : "ws://localhost:6680/mopidy/ws/",
		//callingConvention: 'by-position-or-by-name'
		});             // Connect to server
	mopidy.on(console.log.bind(console));  // Log all events
	mopidy.on("state:online", queueAndPlay);
	mopidy.connect();	
}

