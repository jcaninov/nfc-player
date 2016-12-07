var MPD = require("../lib/boubbou_mpd.js");

var mpd_client = new MPD(6600, 'localhost');

mpd_client.enableLogging();

//mpd_client.on('Event', function (state) { console.log("->-> Evento: "+state.type); console.log(state); });

//mpd_client.on('Error', function (state) { console.log("->-> Evento 'Error'"); console.log(state); });
//mpd_client.on('UnhandledEvent', function (state) { console.log("->-> Evento 'UnhandledEvent'"); console.log(state); });
//mpd_client.on('AuthFailure', function (state) { console.log("->-> Evento 'AuthFailure'"); console.log(state); });
//mpd_client.on('DatabaseChanging', function (state) { console.log("->-> Evento 'DatabaseChanging'"); console.log(state); });
//mpd_client.on('DataLoaded', function (state) { console.log("->-> Evento 'DataLoaded'"); console.log(state); });
//mpd_client.on('OutputChanged', function (state) { console.log("->-> Evento 'OutputChanged'"); console.log(state); });
//mpd_client.on('StateChanged', function (state) { console.log("->-> Evento 'StateChanged'"); console.log(state); });
//mpd_client.on('QueueChanged', function (state) { console.log("->-> Evento 'QueueChanged'"); console.log(state); });
//mpd_client.on('PlaylistsChanged', function (state) { console.log("->-> Evento 'PlaylistsChanged'"); console.log(state); });
//mpd_client.on('PlaylistChanged', function (state) { console.log("->-> Evento 'PlaylistChanged'"); console.log(state); });
//mpd_client.on('Connect', function (state) { console.log("->-> Evento 'Connect'"); console.log(state); });
//mpd_client.on('Disconnect', function (state) { console.log("->-> Evento 'Disconnect'"); console.log(state); });

// 'Error', 'Event', 'UnhandledEvent', 'AuthFailure', 
// 'DatabaseChanging', 'DataLoaded', 'OutputChanged', 
// 'StateChanged', 'QueueChanged', 'PlaylistsChanged', 
// 'PlaylistChanged','Connect', 'Disconnect'
/*
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