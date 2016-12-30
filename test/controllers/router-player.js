var express = require('express');

module.exports = function(mpdClient){

	var router = express.Router();

	// Playback methods
	router.get('/suffle-off', function (req, res) {
		mpdClient.disableRandomPlay();
		res.end();
	});

	router.get('/suffle-on', function (req, res) {
		mpdClient.enableRandomPlay();
		res.end();
	});

	router.get('/play', function (req, res) {
		mpdClient.play();
		res.end();
	});

	router.get('/stop', function (req, res) {
		mpdClient.stop();
		res.end();
	});

	router.get('/pause', function (req, res) {
		mpdClient.pause();
		res.end();
	});

	router.get('/next', function (req, res) {
		mpdClient.next();
		res.end();
	});

	router.get('/prev', function (req, res) {
		mpdClient.previous();
		res.end();
	});

	router.get('/get-state', function (req, res) {
		var status = mpdClient.getPlaystate();
		res.json(status);
	});

	router.get('/get-volume', function (req, res) {
		var volume = mpdClient.getVolume();
		res.json(volume);
	});

	router.get('/get-current-song', function (req, res) {
		var song = mpdClient.getCurrentSong();
		res.json(parseSong(song));
	});

	router.get('/get-current-song-time', function (req, res) {
		var songtime = mpdClient.getCurrentSongTime();
		res.json(songtime);
	});

	router.get('/get-queue', function (req, res) {
		var queue = mpdClient.getQueue();
		var songs = queue.getSongs();
		var items = parseSongs(songs);
		res.json(items);
	});

	router.get('/clear-queue', function (req, res) {
		mpdClient.clearQueue();
		res.end();
	});

	router.get('/get-playlist/:id', function (req, res) {
		mpdClient.getPlaylist(req.params.id, function(pl) {
			if (pl) {
				var songs = pl.getSongs();
				var items = parseSongs(songs);
				res.json(items);
			} 
			res.send('No playlist found with ID: '+req.params.id);
		});
	});

	router.get('/load-playlist/:id', function (req, res) {
		mpdClient.loadPlaylistIntoQueue(req.params.id);
		res.end();
	});

	this.parseSongs = function(songList) {
		var items = [];
		songList.forEach(function (song) {
			items.push(parseSong(song));
		});
		return items;
	};

	this.parseSong = function(song) {
		if (!song) return null;
		return {
			'artist' : song.getArtist(),
			'title' : song.getTitle(),
			'file' : song.getPath()
			};
	};

	return router;
};
