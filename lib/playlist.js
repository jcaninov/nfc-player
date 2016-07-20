var Track = require('./track.js');
const Log = require('npmlog');

var Playlist = function() {

	var _tracks = [];

	var getTrackIndex = function(track){
		return _tracks.indexOf(track);
	};

	var addTrack = function(track){
		_tracks.push(track);
	};

	var removeTrack = function(track){
		var index = getTrackIndex(track);
		_tracks.splice(index, 1);
	};

	var modifyTracks = function(item, action){
		if (item instanceof Array)
		{
			//Logger.echo('item instanceof Array');			
			for(var i=0;i<item.length;i++)
			{
				if (item[i] instanceof Track){
					action(item[i]);
				}
			}
		}
		else if (item instanceof Track)
		{
			//Logger.echo('item typeof String');
			action(item);
		}

		Log.info('playlist',_tracks);
	};


	this.add = function(item){
		modifyTracks(item, addTrack);
	};

	this.remove = function(item){
		modifyTracks(item, removeTrack);
	};

	this.getTrack = function(index){
		if (_tracks[index] !== 'undefined'){
			return _tracks[index];
		}
	};

	this.getTrackIndex = getTrackIndex;

	return this;
};

module.exports = Playlist;