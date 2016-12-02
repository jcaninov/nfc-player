var MPD = require("../lib/boubbou_mpd.js");

var mpd_client = new MPD(6600, 'localhost');

//mpd_client.enableLogging();

mpd_client.on('Connect',function(state){
	//mpd_client.UpdateDatabase();	
	mpd_client.getDirectoryContents("",logDirectoryContents);
});

function logDirectoryContents(data){
	console.log("xxxxx DirectoryContents >>>>> ");
	if (data === undefined || data === null || data.length <= 0){
		return;	
	} 
	var playlists = mpd_client.getPlaylists();
	if (playlists != undefined && playlists != null && playlists.length > 0){
		playlists[0].clear();
		data.forEach(function(dat){
			var metadata  = dat.getMetadata();
			mpd_client.Playlist.addSongByFile(metadata.file);
		});
	}
}

mpd_client.on('PlaylistChanged',function(state){
	console.log("PlaylistChanged!");
	/*
	var playlists = mpd_client.getPlaylists();
	console.log("playlists: ");
	console.log(playlists);
	console.log("getPlaystate() => ");
	console.log(mpd_client.getPlaystate());
	mpd_client.loadPlaylistIntoQueue(playlists[0]);
	*/
});




// 'Error', 'Event', 'UnhandledEvent', 'AuthFailure', 
// 'DatabaseChanging', 'DataLoaded', 'OutputChanged', 
// 'StateChanged', 'QueueChanged', 'PlaylistsChanged', 
// 'PlaylistChanged','Connect', 'Disconnect'
/*
mpd_client.on('Connect',function(state){
	var playlists = mpd_client.getPlaylists();
	console.log("playlists: ");
	console.log(playlists);

	console.log("getPlaystate() => ");
	console.log(mpd_client.getPlaystate());
	mpd_client.loadPlaylistIntoQueue(playlists[0]);
	mpd_client.play();
});


mpd_client.on('StateChanged',function(state){
    console.log("--------------------------");    
    console.log(state.playstate);
    if (state.playstate == "play")
    {
    	var obj = mpd_client.getQueue();    	
    	var songs = obj.getSongs();
    	songs.forEach(function(song){
    		console.log(song.getMetadata());
    	});
	}
});
*/

/*
---------STATE Object------------
{ version: '0.17.0',
  connected: true,
  playstate: 'play',
  volume: 0.5,
  repeat: 0,
  single: 0,
  consume: 0,
  random: 0,
  crossfade: 0,
  mix_ramp_threshold: 0,
  current_song: { queue_idx: 0, elapsed_time: 0, id: 2 },
  next_song: { queue_idx: 1, id: 3 },
  current_queue:
   { addSongByFile: [Function],
     clear: [Function],
     removeSongByPosition: [Function],
     moveSongByPosition: [Function],
     swapSongsByPosition: [Function],
     getSongs: [Function],
     clone: [Function] },
  queue_version: 7,
  playlists:
   [ { playlist: 'sample_playlist',
       last_modified: '2016-11-29T09:49:36.505Z' },
     { playlist: 'testplaylist_0801_2',
       last_modified: '2016-11-29T08:44:31.505Z' } ],
  playlistlength: 2,
  mixrampdelay: '1.#QNAN0',
  time: '0:215',
  bitrate: 128,
  audio: '44100:24:2' }
--------------------------
*/