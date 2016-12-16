var MPD = require("../lib/boubbou_mpd.js");

var mpd_client = new MPD(6600, 'localhost');

//mpd_client.enableLogging();

mpd_client.on('Connect', function (){
    mpd_client.updateDatabase();
    //
});

//mpd_client.on('QueueChanged', function (state) {
//    console.log("->-> Evento 'QueueChanged'");
//    var songs = state.getSongs();
//    console.log(songs);
//});

mpd_client.on('Event', function (state) {
    console.log("->-> Evento: " + state.type);
});

function getTags() {
    var tagTypes = mpd_client.getTagTypes();
    tagTypes.forEach(function (tag) {
        console.log(tag);
    });
}

function doSearchResults(result) {
    console.log("---------------- Search Results ("+result.length+")--------------- ");
    result.forEach(function (song) {
        var artist = song.getArtist();
        var title = song.getTitle();
        var file = song.getPath();
        console.log(file + "\t" + artist);
        //console.log( song.getMetadata());
    });
}

mpd_client.on('DataLoaded', function (state) {
    mpd_client.search({ 'artist': 'pugliese' }, doSearchResults);
});

//mpd_client.on('Error', function (state) { console.log("->-> Evento 'Error'"); console.log(state); });
//mpd_client.on('UnhandledEvent', function (state) { console.log("->-> Evento 'UnhandledEvent'"); console.log(state); });
//mpd_client.on('AuthFailure', function (state) { console.log("->-> Evento 'AuthFailure'"); console.log(state); });
//mpd_client.on('DatabaseChanging', function (state) { console.log("->-> Evento 'DatabaseChanging'"); console.log(state); });
//mpd_client.on('DataLoaded', function (state) { console.log("->-> Evento 'DataLoaded'"); console.log(state); });
//mpd_client.on('OutputChanged', function (state) { console.log("->-> Evento 'OutputChanged'"); console.log(state); });
//mpd_client.on('StateChanged', function (state) { console.log("->-> Evento 'StateChanged'"); console.log(state); });
//mpd_client.on('PlaylistsChanged', function (state) { console.log("->-> Evento 'PlaylistsChanged'"); console.log(state); });
//mpd_client.on('PlaylistChanged', function (state) { console.log("->-> Evento 'PlaylistChanged'"); console.log(state); });
//mpd_client.on('Disconnect', function (state) { console.log("->-> Evento 'Disconnect'"); console.log(state); });

// 'Error', 'Event', 'UnhandledEvent', 'AuthFailure', 
// 'DatabaseChanging', 'DataLoaded', 'OutputChanged', 
// 'StateChanged', 'QueueChanged', 'PlaylistsChanged', 
// 'PlaylistChanged','Connect', 'Disconnect'
