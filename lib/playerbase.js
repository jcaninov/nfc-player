const Log = require('npmlog');
const Enums = require('./enums.js');

var PlayerBase = function(){
	this.state = Enums.playerState.stopped;
	this.getState = function(){ return this.state; };
	this.setState = function(newState){ this.state = newState; };
	this.stop = function(){ Log.info('debug','stop base'); };
	this.play = function(){ Log.info('debug','play base'); };
	this.pause = function(){ Log.info('debug','play base'); };
};

module.exports = PlayerBase;