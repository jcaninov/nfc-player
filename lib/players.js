const Log = require('npmlog');
const Util = require('./common.js');
const Enums = require('./enums.js');

//var PlayerState = ['stopped', 'playing', 'paused'];
var PlayerState = {stopped:'stopped', playing:'playing', paused:'paused'};

var PlayerBase = function(){
	this.state = PlayerState.stopped;
	this.getState = function(){ return this.state; };
	this.setState = function(newState){ this.state = newState; };
	this.stop = function(){ Log.info('debug','stop base'); };
	this.play = function(){ Log.info('debug','play base'); };
	this.pause = function(){ Log.info('debug','play base'); };
};


var AudioPlayer = function(){ 
  var that = new PlayerBase();
  
	that.play = function(track){ Log.info('','AudioPlayer playing '+track.title+' - '+that.state); };
	that.stop = function(){ Log.info('','AudioPlayer stop'+' - '+that.state); };
	that.pause = function(){ Log.info('','AudioPlayer pause'+' - '+that.state); };

	return that;
};

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