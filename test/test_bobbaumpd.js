var MPD = require("../lib/boubbou_mpd.js");

var mpd_client = new MPD(6600, 'localhost');

mpd_client.on('StateChanged',function(state){
    console.log(state);
});