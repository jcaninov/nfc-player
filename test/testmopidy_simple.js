var AudioPlayer = require('../lib/audioplayer.js'),
	Track = require('../lib/track.js'), 
    net = require('net'),
	mpd = require('mpd'),
	Mopidy = require('mopidy');

var wSocket = net.connect({ port: 6600,  host: 'localhost'});
var mopidy = {};

wSocket.on('connect', function () {
   
    mopidy = new Mopidy({
        autoConnect: true, 
        backoffDelayMin: 15000,
        webSocket: wSocket
    });          // Connect to server
    
    //mopidy.on(console.log.bind(console));  // Log all events
    mopidy.on(function (evento) {
        console.log(evento);
    });  // Log all events
    
    mopidy.on("state:online", function () { console.log("-----------------> Connected!! <--------------- "); });
    /*
    mopidy.on("state:offline", function () { console.log("Desconectado...."); });
    mopidy.on("state:reconnectionPending", function () { console.log("Pendiente reconnect"); });
    mopidy.on("state:reconnecting", function () { console.log("Reconnectandoo..."); });
    */

    mopidy.connect();
    queueAndPlay(mopidy);
    
     
});




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

//mopidy.on("state:online", queueAndPlay);
