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

var  Track = function(title, url, album, artist, trackNumber) {

	this.title = title;
	this.url = url;
	this.album = album;
	this.artist = artist;

};

var Playlist = function() {

	var _tracks = [];

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

	var getTrackIndex = function(track)
	{
		return _tracks.indexOf(track);
	}


	var add = function(item){
		modifyTracks(item, addTrack);
	};

	var remove = function(item){
		modifyTracks(item, removeTrack);
	};

	return {
		add : add,
		remove : remove
	};
};

var Playback = function (){
	var _list = [],
	_index = 0;

	var ReadNext = function(){};
	var	ReadPreviuos = function(){};
	var ReadCurrent = function(){};

	return {
		ReadNext: ReadNext,
		ReadPreviuos : ReadPreviuos,
		ReadCurrent : ReadCurrent
	};
};

var Rockola = {
	Playlist : new Playlist(),
	Play : function(){},
	Stop : function(){},
	Next : function(){},
	Mode : { normal : 0, shuffle : 1 },
	player : {},
};


var tracks = [ new Track("This is music"),  new Track("oooo","http://ooo.com")];
//Logger.echo(JSON.stringify(tracks[0], null, 2));
Rockola.Playlist.add(tracks);


console.log("\n\r\n\r");
var trackR = [ new Track("This is music")];
Rockola.Playlist.remove(trackR);


/*
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