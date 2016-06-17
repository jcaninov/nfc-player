
var Playlist = {
	Add : function(){},
	Remove : function(){},	
	ReadNext : function(){},
	ReadPreviuos : function(){},
	ReadCurrent : function(){},
	List : [],
	index : 0
};

var Rockola = {
	Playlist : {},
	Play : function(){},
	Stop : function(){},
	Next : function(){},
	Mode : { normal : 0, shuffle : 1 },
	player : {},
};
/*

var Player = require('player');
 
Rockola.player = new Player('http://www.soundjig.com/images/freedownload.gif');

Rockola.player.play(function(err, player){
  console.log('playend!');
});

*/
