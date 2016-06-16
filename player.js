var Player = require('player');
 
// create player instance 
var player = new Player('http://www.soundjig.com/images/freedownload.gif');
 
// play now and callback when playend 
player.play(function(err, player){
  console.log('playend!');
});
