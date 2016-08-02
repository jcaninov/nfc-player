
var Log = require('npmlog');
var Util = require('./common.js');
var Enums = require('./enums.js');
var PlayerBase = require('./playerbase.js');
var AudioPlayer = require('./audioplayer.js');

var PlayerState = Enums.playerState;


var VideoPlayer = function(){ 
  var that = new PlayerBase();  
	return that;
};

var PlayerController = function(){
	var that = new PlayerBase();

	var players = { 
		'audio' : new AudioPlayer(),
		'video' : new VideoPlayer()
	};
 	var activePlayer = players.audio;

	that.getPlayerForTrack = function(track){
		if (track !== undefined && track.trackType !== undefined){
			switch(track.trackType){
				case Enums.trackType.video: 
					return players.video;
				default: 
					return players.audio;
			}
		}
		return players.audio;
	};

	that.stop = function(){
		if (activePlayer.getState() != PlayerState.stopped) {
			activePlayer.setState(PlayerState.stopped);
			activePlayer.stop();			
		}
	};

	that.pause = function(){
		if (activePlayer.getState() != PlayerState.paused ) {
			activePlayer.setState(PlayerState.paused);
			activePlayer.pause();
		}
	};

	that.play = function(track){
		if (activePlayer.getState() == PlayerState.playing) {
			activePlayer.stop();
		}
		if (activePlayer.getState() == PlayerState.stopped) {			
			activePlayer = that.getPlayerForTrack(track);
		}
		activePlayer.setState(PlayerState.playing);
		activePlayer.play(track);		
	};

	return that;
};

module.exports = PlayerController;