const Log = require('npmlog');
var Util = require('./common.js');
const Enums = require('./enums.js');

console.log(Enums);

var PlayerState = ['stopped', 'playing', 'paused'];

function PlayerBase(){
	this.state = PlayerState.stopped;
}
PlayerBase.prototype.play = function(){ };


function AudioPlayer(){ }
AudioPlayer.prototype.parent = Util.extend(AudioPlayer, PlayerBase);


function VideoPlayer(){ }
VideoPlayer.prototype.parent = Util.extend(VideoPlayer, PlayerBase);


function PlayerController(){
	var audioPlayer = new AudioPlayer();
	var videoPlayer = new VideoPlayer();
	var activePlayer = audioPlayer;

	var getPlayerForTrack = function(track){
		if (track.trackType !== undefined && track.trackType instanceof Enums.TrackType ){
			switch(track.trackType){
				case Enums.TrackType.audio: return audioPlayer;
				case Enums.TrackType.video: return videoPlayer;
			}
		}
		return audioPlayer;
	};
}
PlayerController.prototype.parent = Util.extend(PlayerController, PlayerBase);
PlayerController.prototype.play = function(track){
	if (this.activePlayer.state == PlayerState.playing) {
		PlayerController.stop();
	}
	if (this.state == PlayerState.stopped) {			
		this.activePlayer = this.getPlayerForTrack(track);
	}
	this.play(track);
	this.state = PlayerState.playing;
};
PlayerController.prototype.stop = function(){
	if (this.state != PlayerState.stopped) {
		this.stop();
		this.state = PlayerState.stopped;
	}
};
PlayerController.prototype.pause = function(){
	if (this.state != PlayerState.paused ) {
		this.pause();
		this.state = PlayerState.paused;
	}
};

module.exports = PlayerController;