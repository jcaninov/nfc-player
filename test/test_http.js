var MPD = require("../lib/boubbou_mpd.js"),
	express = require('express'),
	color = require('cli-color'),
	events = require('events'),
	bodyParser = require('body-parser');

var eventEmitter = new events.EventEmitter();
var app = express();

var datos = {};

// Middleware
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST'); // 'GET,POST,PUT,HEAD,DELETE,OPTIONS'
	res.header("Access-Control-Allow-Headers", "content-Type,X-Requested-With");
	next();
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Routes
app.get('/', function (req, res) {
    res.send("F-Player!");
});

app.get('/search/:tag/:tagValue', function (req, res) {
    searchFiles(req.params.tag, req.params.tagValue);
    res.send();
});

app.get('/get-tags', function (req, res) {
    var tags = mpd_client.getTagTypes();
    res.send(JSON.stringify(tags));
});

app.post('/save-playlist', function (req, res) {
	var id = req.body.id;
	var items = req.body.items;

    var playlists = mpd_client.getPlaylists();
    if (playlists.indexOf(id) >= 0) {
        mpd_client.clearPlaylist(id);
    }
	items.forEach(function (song) {
		mpd_client.addSongToPlaylistByFile(id, song.file);
	});
    res.send();
});

app.get('/update-stream', function(req, res) {
    var sse = startSees(res);
    eventEmitter.on("searchResultsFound", sendChat);
    req.once("end", function () {
        eventEmitter.removeListener("searchResultsFound", sendChat);
    });
    function sendChat() {
        sse("message", JSON.stringify(datos));
    }
    function startSees() {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write("\n");
        
        return function sendSse(name, data, id) {
            res.write("event: " + name + "\n");
            if (id) res.write("id: " + id + "\n");
            res.write("data: " + data + "\n\n");
        };
    }
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});










var dbUpdateEnd = true;
var mpd_client = new MPD(6600, 'localhost');

mpd_client.enableLogging();

mpd_client.on('Connect', function (){
    mpd_client.updateDatabase();
});
mpd_client.on('Event', function (state) {
    console.log(color.blueBright("->-> Evento: " + state.type));
});

function searchFiles(tag, value)
{
    var params = {};
    params[tag] = value;
    mpd_client.search(params, doSearchResults);
}

function doSearchResults(result) {
    var items = [];
    console.log("---------------- Search Results (" + result.length + ")--------------- ");
    result.forEach(function (song) {
        var artist = song.getArtist();
        var title = song.getTitle();
        var file = song.getPath();
        console.log(file + "\t" + artist);
        //app.write(file);
        //console.log( song.getMetadata());
        items.push({
            'artist' : artist,
            'title' : title,
			'file' : file
        });
    });
    datos = items;
    eventEmitter.emit('searchResultsFound');
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