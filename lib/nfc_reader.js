var EventEmitter = require('events').EventEmitter,
  Log = require('npmlog'),
	Util = require('./common.js'),
  Track = require('./track.js'),
	Enums = require('./enums.js'),
	mpdCmd = require('./mpd_commands.js'), 
  util = require('util');
var ev = Enums.events;

module.exports = NfcReader;
/*
MpdClient.Command = Command
MpdClient.cmd = cmd;
MpdClient.parseKeyValueMessage = parseKeyValueMessage;
MpdClient.parseArrayMessage = parseArrayMessage;
*/

function NfcReader() {
  EventEmitter.call(this);

  this.buffer = "";
}
util.inherits(NfcReader, EventEmitter);

NfcReader.prototype.receive = function(data) {
  var m;
  this.buffer += data;
};

NfcReader.prototype.send = function(data) {
  var m;
  this.emit(ev.playTrack, new Track("sample", 'Sample Music/sample.wav'));  
};

NfcReader.prototype.handleIdleResults = function(msg) {
  var self = this;
  msg.split("\n").forEach(function(system) {
    if (system.length > 0) {
      var name = system.substring(9);
      self.emit('system-' + name);
      self.emit('system', name);
    }
  });
};
