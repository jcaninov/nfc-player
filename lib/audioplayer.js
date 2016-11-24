var Log = require('npmlog'),
	Util = require('./common.js'),
	Enums = require('./enums.js'),
	PlayerBase = require('./playerbase.js'),
	mpdCmd = require('./mpd_commands.js');
var ev = Enums.events;

var playlistName = 'testplaylist_0801_2';

var AudioPlayer = function(mpdClient, mpdInstance, eventEmitter){
  var that = new PlayerBase(),
  Eventos = eventEmitter,
  mpd = mpdInstance, 
  client = mpdClient;

  that.registerEvents = function(){
  	Eventos.on(ev.playTrack, (track) => { that.play(track); });
  	Eventos.on(ev.stop, () => { that.stop(); });
	Eventos.on(ev.pause, () => { that.pause(); });  	
	Eventos.on(ev.error, (err) => { Log.Error('error', 'Error! '+err); });
  };
  
  that.list = function(track){    
    sendCommand(mpdCmd.Playlists.playlistadd, [playlistName, '']);
    sendCommand(mpdCmd.Playlists.load, [playlistName]);
    sendCommand(mpdCmd.CurrentPlaylist.playlistinfo, []);
  };

  that.play = function(track){    
  /*	
    sendCommand("search", ['album', 'Tangos']);
  	sendCommand("end", []);
	*/
    sendCommand(mpdCmd.Playlists.playlistadd, [playlistName, '']);
    sendCommand(mpdCmd.Playlists.load, [playlistName]);
  	sendCommand(mpdCmd.CurrentPlaylist.clear, []);    
    sendCommand(mpdCmd.CurrentPlaylist.add, [track.url]);
    sendCommand(mpdCmd.Playback.play, []);
  	return;
  };

  that.stop = function(){
  	sendCommand(mpdCmd.Playback.stop);
  };

  that.pause = function(){
  	sendCommand(mpdCmd.Playback.pause);
  };


  var sendCommand = function(command, options, cmdCallback){
   	var text = (command.hasOwnProperty('key')) ? command.key : command;
	var params = (options === null || options === undefined) ? [] : options;
	var callbackparam = (cmdCallback === null || cmdCallback === undefined) ? commandCallback : cmdCallback;

   	var cmd = mpd.cmd(text, params);
   	try{
   		client.sendCommand(cmd, callbackparam);	
   	}
   	catch(err)
   	{
   		//debugger;
   		Log.error('ERROR!!!','CMD: '+text+'| Params: '+params);
   		Log.error('ERROR!!!','ERROR: '+err);
   	}
    
    return;
  };

  var commandCallback = function(err, data){ 
    //debugger;
    if (err){
    	console.log("[callback] ERROR: "+ err);//Log.error('ERROR!!!', 'Error: '+err+' || Data: '+data);	
    } 
    
    if (data) {
    	console.log("[callback]"); //Log.info('Data: '+data);
    	console.log(Util.parseData(data));
    }

    return;
  };

  return that;
};


module.exports = AudioPlayer;