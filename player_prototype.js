/* NPM Packages

  <> Mplayer =  https://www.npmjs.com/package/mplayer
  <> Node inspector = nodejs Debugger || https://github.com/node-inspector/node-inspector#quick-start


*/

var mpd = require('mpd'),
    cmd = mpd.cmd;
var client = mpd.connect({
  port: 6600,
  host: 'localhost',
});
client.on('ready', function() {
  console.log("ready");
  RunRockola();
});
client.on('system', function(name) {
  console.log("update", name);
});
client.on('system-player', function() {
  client.sendCommand(cmd("status", []), function(err, msg) {
    if (err) throw err;
    console.log(msg);
  });
});




var DEBUG = true;

var Logger = new function(){

  var echo = function (message) {
    if (!DEBUG){
      return;
    }

    if (typeof message == 'string'){
      output(message);  
    } 
    else if (message instanceof Array){
      for(var i=0;i<message.length;i++)
      {
        output(message[i]);
      }
    }
    else {
      output('tipo: ' + typeof message + ' // content:' + message);
    }   
  };

  var output = function (message) {
    console.log(JSON.stringify(message,null,2));
  };

  return {
    echo : echo
  };
};

var Util = {
  //Douglas Crockford's inheritance method
  extendObject : function (o) {
      var F = function () { };
      F.prototype = o;
      return new F();
  }
};


var fileTypes = { 
  'audio' : ["wav", "mp3"],
  'video' : ["mp4", "avi", "mpg"]
};

/*
* Tracks
* 
*/
var TrackType = ['audio', 'video'];
var Track = function(title, url, album, artist, type){
  this.title = title;
  this.url = url;
  this.album = album;
  this.artist = artist;
  this.trackType = type;
};

/*
* Playlist
* 
*/
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

    Logger.echo(_tracks);
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

/*
* Players
* 
*/
var PlayerState = ['stopped', 'playing', 'paused'];
var PlayerBase = function(){
  this.state = PlayerState.stopped;

  this.play = function(){
    Logger.echo(" > Playing");
  };

  this.pause = function(){
    Logger.echo(" || Pause ");
  };

  this.stop = function(){
    Logger.echo(" [] Stop");
  };
  return this;
};

var AudioPlayer = function(){
  var parent = new PlayerBase(),
    thisAudioPlayer = Util.extendObject(parent);
  
  thisAudioPlayer.play = function(track){
    var command = '';

    sendCommand('playlistadd', ['testplaylist','']);
    sendCommand('load', ['testplaylist']);

//    sendCommand('clear', []);
//    sendCommand('add', [track.url]);

//    sendCommand('listplaylist', ['testplaylist']);
    sendCommand('stop', []);

  };

  var sendCommand = function(command, options){
    command = cmd(command, options);
    console.log('Command: '+command);
    client.sendCommand(command, commandCallback);
    return;
  };

  var commandCallback = function(err, data){ 
    if (err || data) console.log('Data: '+data+' | Error: '+err);
    return;
  };

  return thisAudioPlayer;
};

var VideoPlayer = function(){
  var parent = new PlayerBase(),
    thisVideoPlayer = Util.extendObject(parent);

  return thisVideoPlayer;
};

var PlayerController = function(){
  var parent = new PlayerBase(),
    thisPlayer = Util.extendObject(parent);

  var audioPlayer = new AudioPlayer();
  var videoPlayer = new VideoPlayer();
  var activePlayer = audioPlayer;

  var getPlayerForTrack = function(track){
    if (track.trackType !== undefined && track.trackType instanceof TrackType ){
      switch(track.trackType){
        case TrackType.audio:
          return audioPlayer;
        break;
        case TrackType.video:
          return videoPlayer;
        break;
      }
    }
    return audioPlayer;
  };

  thisPlayer.play = function(track){

    if (activePlayer.state == PlayerState.playing) {
      thisPlayer.stop();
    }

    if (activePlayer.state == PlayerState.stopped) {      
      activePlayer = getPlayerForTrack(track);
    }

    activePlayer.play(track);
    activePlayer.state = PlayerState.playing;
  };

  thisPlayer.stop = function(){
    if (activePlayer.state != PlayerState.stopped ) {
      activePlayer.stop();
      activePlayer.state = PlayerState.stopped;
    }
  };

  thisPlayer.pause = function(){
    if (activePlayer.state != PlayerState.paused ) {
      activePlayer.pause();
      activePlayer.state = PlayerState.paused;
    }
  };

  return thisPlayer;
};


/*
* Rockola
* 
*/
var Rockola = function(){

  var _playlist = new Playlist();
  var _mode = ['normal', 'shuffle'];
  var _player = new PlayerController();

  var _playbackIndex = 0;

  this.play  = function(){
    var track = _playlist.getTrack(_playbackIndex);
    if (track != undefined){
      _player.play(track);
    }
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



function RunRockola(){
  //.replace(/\\/g,"\\\\");
  var tracks = [ new Track("sample", 'Sample Music/sample.wav') ];
  //var tracks = [ new Track("sample", "sample.wav") ];
  //var tracks = [ new Track("This is music"),  new Track("oooo","http://ooo.com")];
  //Logger.echo(JSON.stringify(tracks[0], null, 2));

  var rock = new Rockola();
  rock.addTrack(tracks);

  rock.play();

  //rock.pause();
  //rock.next();
  return;
}



/*
var Jasmine = require('jasmine');
var jasmine = new Jasmine();






var Player = require('player'); 
Rockola.player = new Player('http://www.soundjig.com/images/freedownload.gif');
Rockola.player.play(function(err, player){
  console.log('playend!');
});
*/






/*
Revealing Prototype Pattern
---------------------------

var Car = function(make, model, level, color, warranty) {
    var _make     = make,
        _model    = model,
        _level    = level,
        _color    = color,
        _warranty = warranty;
   
    return {
      getInfo: function () {
        return _make + ', ' + _model + ', ' + _level + ', '+ _color + ', ' + _warranty;
      }
    };
};

var UsedCar = function(mileage) {
    //Define a variable unique to each instance of UsedCar
    this.mileage = mileage;
};
 
UsedCar.prototype = new Car('Honda', 'Civic', 'LX', 'gray', 2);
var aUsedCar = new UsedCar(50000);
alert(aUsedCar.getInfo()); //displays Honda, Civic, LX, gray, 2
 
//this will add the mileage to getInfo()'s output
UsedCar.prototype.getInfo = function(superGetInfo) {
  return function() { return superGetInfo() + ', '+ this.mileage; };
}(UsedCar.prototype.getInfo);
 
alert(aUsedCar.getInfo()); //displays Honda, Civic, LX, gray, 2, 50000



MODULE + Revealing
-------------------

var Module = (function () {

  var privateMethod = function () {
    // private
  };

  var someMethod = function () {
    // public
  };

  var anotherMethod = function () {
    // public
  };
  
  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod
  };

})();


var ModuleTwo = (function (Module) {
    
    Module.extension = function () {
        // another method!
    };
    
    return Module;
    
})(Module || {});


*/