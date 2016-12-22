var MPD = require("../lib/boubbou_mpd.js"),
    express = require('express'),
    color = require('cli-color'),
    events = require('events');

var eventEmitter = new events.EventEmitter();
var app = express();

var datos = {};

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function (req, res) {
    res.send("F-Player!");
});
app.get('/:artist', function (req, res) {
    res.send(req.params);
});
app.get('/:tag/:tagValue', function (req, res) {
    searchFiles(req.params.tag, req.params.tagValue);
    res.send(req.params+" > OK!");
});


app.get('/update-stream', function(req, res) {
  // let request last as long as possible
  req.socket.setTimeout(Infinity);

  var messageCount = 0;
  

  // When we receive a message from the redis connection
  eventEmitter.on("message", function(data) {
    res.write(JSON.parse(datos) + '\n\n'); // Note the extra newline
    res.end();
  });

  //send headers for event-stream connection
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.write('\n');

  // The 'close' event is fired when a user closes their browser window.
  // In that situation we want to make sure our redis channel subscription
  // is properly shut down to prevent memory leaks...and incorrect subscriber
  // counts to the channel.
  req.on("close", function() {

  });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});










var dbUpdateEnd = true;
var mpd_client = new MPD(6600, 'localhost');

mpd_client.enableLogging();

mpd_client.on('Connect', function (){
    mpd_client.updateDatabase();
    //searchFiles();
});
mpd_client.on('Event', function (state) {
    console.log(color.blueBright("->-> Evento: " + state.type));
});
mpd_client.on('DataLoaded', function (state) {
    searchFiles('file','pugli');
});

function getTags() {
    var tagTypes = mpd_client.getTagTypes();
    tagTypes.forEach(function (tag) {
        console.log(tag);
    });
}

function searchFiles(tag, value)
{
    var params = {};
    params[tag] = value;
    mpd_client.search(params, doSearchResults);
}

function doSearchResults(result) {

    // Publica a los suscriptores de Redis
    datos = result;
    eventEmitter.emit('updates')


    console.log("---------------- Search Results ("+result.length+")--------------- ");
    result.forEach(function (song) {
        var artist = song.getArtist();
        var title = song.getTitle();
        var file = song.getPath();
        console.log(file + "\t" + artist);
        //app.write(file);
        //console.log( song.getMetadata());
    });    
}

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