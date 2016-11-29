var mpdCmd = function(key, description, defaultParam){
	this.key = key;
	this.desc = description;
	this.params = defaultParam || null;

	return this;
};

var MpdCommands = {
	Playback : { 
		// ejemplo : new mpdCmd('','',{}),
		pause 	: new mpdCmd('pause', 	'Toggles pause/resumes playing, PAUSE param is 0 or 1.', { pause: 0, play: 1}),
		next 	: new mpdCmd('next', 	'Plays next song in the playlist.'),
		play  	: new mpdCmd('play ', 	'Begins playing the playlist at song number SONGPOS param', 0),
		playid  : new mpdCmd('playid ', 'Begins playing the playlist at song SONGID.',0),
		previous: new mpdCmd('previous', 'Plays previous song in the playlist'),
		seek 	: new mpdCmd('seek', 	'seek {SONGPOS} {TIME} => Seeks to the position TIME (in seconds; fractions allowed) of entry SONGPOS in the playlist.',{ songPos: 0, time: 30}),
		seekid  : new mpdCmd('seekid', 	'seekid {SONGID} {TIME} => Seeks to the position TIME (in seconds; fractions allowed) of song SONGID.',{ songId: 0, time: 30}),
		seekcur : new mpdCmd('seekcur', 'seekcur {TIME} => Seeks to the position TIME (in seconds; fractions allowed) within the current song. If prefixed by "+" or "-" then the time is relative to the current playing position.', 0),
		stop 	: new mpdCmd('stop', 	'stop => Stops playing.')
	},
	Queue : {
		add 	: new mpdCmd('add',	'add {URI} => Adds the file URI to the playlist (directories add recursively). URI can also be a single file.', ""),
		addid 	: new mpdCmd('addid ','addid {URI} [POSITION] => Adds a song to the playlist (non-recursive) and returns the song id. URI is always a single file or URL',{ uri: "", pos: 0}),
		clear 	: new mpdCmd('clear','clear => Clears the current playlist.'),
		delete 	: new mpdCmd('delete','delete [{POS} | {START:END}] => Deletes a song from the playlist.',{}),
		deleteid: new mpdCmd('deleteid','deleteid {SONGID} => Deletes the song SONGID from the playlist',0),
		move 	: new mpdCmd('move','move [{FROM} | {START:END}] {TO} = > Moves the song at FROM or range of songs at START:END to TO in the playlist.',{}),
		moveid  : new mpdCmd('moveid','moveid {FROM} {TO} => Moves the song with FROM (songid) to TO (playlist index) in the playlist. If TO is negative, it is relative to the current song in the playlist (if there is one).',{}),
		playlistfind: new mpdCmd('playlistfind','playlistfind {TAG} {NEEDLE} = >Finds songs in the current playlist with strict matching.',{}),
		playlistid 	: new mpdCmd('playlistid','playlistid {SONGID} => Displays a list of songs in the playlist. SONGID is optional and specifies a single song to display info for.',{}),
		playlistinfo: new mpdCmd('playlistinfo','playlistinfo [[SONGPOS] | [START:END]] => Displays a list of all songs in the playlist, or if the optional argument is given, displays information only for the song SONGPOS or the range of songs START:END',{}),
		playlistsearch : new mpdCmd('playlistsearch','playlistsearch {TAG} {NEEDLE} => Searches case-insensitively for partial matches in the current playlist.',{}),
		plchanges 	: new mpdCmd('plchanges','plchanges {VERSION} [START:END] => Displays changed songs currently in the playlist since VERSION. Start and end positions may be given to limit the output to changes in the given range. To detect songs that were deleted at the end of the playlist, use playlistlength returned by status command.',{}),
		plchangesposid : new mpdCmd('plchangesposid','plchangesposid {VERSION} [START:END] => Displays changed songs currently in the playlist since VERSION. This function only returns the position and the id of the changed song, not the complete metadata. This is more bandwidth efficient. To detect songs that were deleted at the end of the playlist, use playlistlength returned by status command.',{}),
		prio 	: new mpdCmd('prio','prio {PRIORITY} {START:END...} => Set the priority of the specified songs. A higher priority means that it will be played first when "random" mode is enabled. A priority is an integer between 0 and 255. The default priority of new songs is 0.',{}),
		prioid 	: new mpdCmd('prioid','prioid {PRIORITY} {ID...} => Same as prio, but address the songs with their id.',{}),
		rangeid : new mpdCmd('rangeid','rangeid {ID} {START:END} => Specifies the portion of the song that shall be played. START and END are offsets in seconds (fractional seconds allowed); both are optional. Omitting both (i.e. sending just ":") means "remove the range, play everything". A song that is currently playing cannot be manipulated this way.',{}),
		shuffle : new mpdCmd('shuffle','shuffle [START:END] => Shuffles the current playlist. START:END is optional and specifies a range of songs.',{}),
		swap 	: new mpdCmd('swap','swap {SONG1} {SONG2} => Swaps the positions of SONG1 and SONG2.',{}),
		swapid 	: new mpdCmd('swapid','swapid {SONG1} {SONG2} => Swaps the positions of SONG1 and SONG2 (both song ids).',{}),
		addtagid 	: new mpdCmd('addtagid','addtagid {SONGID} {TAG} {VALUE} => Adds a tag to the specified song. Editing song tags is only possible for remote songs. This change is volatile: it may be overwritten by tags received from the server, and the data is gone when the song gets removed from the queue.',{}),
		cleartagid 	: new mpdCmd('cleartagid','cleartagid {SONGID} [TAG] => Removes tags from the specified song. If TAG is not specified, then all tag values will be removed. Editing song tags is only possible for remote songs.',{})
	},
	Playlists : { 
		listplaylist : new mpdCmd('listplaylist','listplaylist {NAME} => Lists the songs in the playlist. Playlist plugins are supported.',""),
		listplaylistinfo : new mpdCmd('listplaylistinfo','listplaylistinfo {NAME} => Lists the songs with metadata in the playlist. Playlist plugins are supported.',{}),
		listplaylists : new mpdCmd('listplaylists','listplaylists => Prints a list of the playlist directory. After each playlist name the server sends its last modification time as attribute "Last-Modified" in ISO 8601 format. To avoid problems due to clock differences between clients and the server, clients should not compare this value with their local clock.',{}),
		load : new mpdCmd('load','load {NAME} [START:END] => Loads the playlist into the current queue. Playlist plugins are supported. A range may be specified to load only a part of the playlist.',{}),
		playlistadd : new mpdCmd('playlistadd','playlistadd {NAME} {URI} => Adds URI to the playlist NAME.m3u. NAME.m3u will be created if it does not exist.',{}),
		playlistclear : new mpdCmd('playlistclear','playlistclear {NAME} => Clears the playlist NAME.m3u.',{}),
		playlistdelete : new mpdCmd('playlistdelete','playlistdelete {NAME} {SONGPOS} => Deletes SONGPOS from the playlist NAME.m3u.',{}),
		playlistmove : new mpdCmd('playlistmove','playlistmove {NAME} {FROM} {TO} => Moves the song at position FROM in the playlist NAME.m3u to the position TO.',{}),
		rename : new mpdCmd('rename','rename {NAME} {NEW_NAME} => Renames the playlist NAME.m3u to NEW_NAME.m3u.',{}),
		rm : new mpdCmd('rm','rm {NAME} => Removes the playlist NAME.m3u from the playlist directory.',{}),
		save : new mpdCmd('save','save {NAME} => Saves the current playlist to NAME.m3u in the playlist directory.',{})
	},
	Options : {
		// https://www.musicpd.org/doc/protocol/playback_option_commands.html
	},
	Database : {
		lsinfo : new mpdCmd('lsinfo', 'lsinfo [URI]')
	}
};

module.exports = MpdCommands;