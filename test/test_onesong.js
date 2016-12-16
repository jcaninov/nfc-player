var MPD = require("../lib/boubbou_mpd.js");

var mpd_client = new MPD(6600, 'localhost');

mpd_client.enableLogging();


mpd_client.on('Connect',function(state){
	mpd_client.getDirectoryContents("",logDirectoryContents);
});

function logDirectoryContents(data){
	console.log("xxxxx DirectoryContents >>>>> ");
	if (data === undefined || data === null || data.length <= 0){
		return;	
	} 
	//console.log(data);
	data.forEach(function(dat){
        var metadata = dat.getMetadata();
	    if (metadata === undefined || metadata.file === undefined){
		    console.log("metadata.file is undefined!");
	    }
        else{
            console.log(":: Adding "+metadata.file);
	        mpd_client.addSongToQueueByFile(metadata.file);
        }
    }); 
}

mpd_client.on('QueueChanged',function(state){
    console.log(">> QueueChanged!");
    var songsQueued = state.getSongs();
    
    if (songsQueued && songsQueued.length > 0) {
        mpd_client.play();        
    }
});


mpd_client.on('StateChanged', function (state) {
    console.log("---------- STATE = "+ state.playstate+"  ----------------");
});


// 'Error', 'Event', 'UnhandledEvent', 'AuthFailure', 
// 'DatabaseChanging', 'DataLoaded', 'OutputChanged', 
// 'StateChanged', 'QueueChanged', 'PlaylistsChanged', 
// 'PlaylistChanged','Connect', 'Disconnect'