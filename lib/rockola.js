var Playlist = require('./playlist.js');
var PlayerController = require('./players.js');

var Rockola = function(){

	var _playlist = new Playlist();
	var _mode = ['normal', 'shuffle'];
	var _player = new PlayerController();

	var _playbackIndex = 0;

	this.play  = function(){
		var track = _playlist.getTrack(_playbackIndex);
		_player.play(track);
	};

	this.pause = function(){
		_player.pause();
	};

	this.stop  = function(){
		_player.stop();
	};

	this.next  = function(){
		_playbackIndex++;
		this.play();
	};

	this.previous  = function(){
		_playbackIndex--;
		this.play();
	};

	this.readNext = function(){
		return _playlist.getTrack(_playbackIndex + 1);		
	};
	this.readPreviuos = function(){
		return _playlist.getTrack(_playbackIndex - 1);	
	};
	this.readCurrent = function(){
		return _playlist.getTrack(_playbackIndex);
	};

	this.addTrack = function(obj){
		_playlist.add(obj);
	};

	this.removeTrack = function(obj){
		_playlist.remove(obj);
	};

	return this;
};

module.exports = Rockola;