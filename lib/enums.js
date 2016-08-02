module.exports = {
	fileTypes : { 
		audio : ["wav", "mp3"],	
		video : ["mp4", "avi", "mpg"]
	},
	trackType : {
		audio : 'audio', 
		video : 'video'
	},
	playerState : {
		stopped:'stopped', 
		playing:'playing', 
		paused:'paused'
	},
	events : {
		error: 'error',
		pause: 'pause',
		playTrack: 'play_track', 
		stop: 'stop'
	}
};

