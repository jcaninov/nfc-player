/**
 * Extends one class with another.
 *
 * @param {Function} destination The class that should be inheriting things.
 * @param {Function} source The parent class that should be inherited from.
 * @return {Object} The prototype of the parent.
 */
function Util(){}

Util.prototype = {
	extend : function extend(destination, source) {
	    destination.prototype = Object.create(source.prototype);
	    destination.prototype.constructor = destination;
	    return source.prototype;
	},
	extendBasic : function extendObject(o) {
        var F = function () { };
        F.prototype = o;
        return new F();
    },
    parseData : function(msg){    
	    var obj = {};
	    debugger;
	    var lines = msg.split(/\n/);
	    for (var i in lines) {
	        if (lines[i].indexOf(':') > -1) {
	            var line = lines[i].split(/: /);
	            var key = line[0];
	            var val = line[1];
	            obj[key] = val;
	        }
	    }
	    return obj;
	},
 	parseArrayMessage : function(msg) {
	  var results = [];
	  var obj = {};

	  msg.split('\n').forEach(function(p) {
	    if(p.length === 0) {
	      return;
	    }
	    var keyValue = p.match(/([^ ]+): (.*)/);
	    if (keyValue === null) {
	      throw new Error('Could not parse entry "' + p + '"');
	    }

	    if (obj[keyValue[1]] !== undefined) {
	      results.push(obj);
	      obj = {};
	      obj[keyValue[1]] = keyValue[2];
	    }
	    else {
	      obj[keyValue[1]] = keyValue[2];
	    }
	  });
	  results.push(obj);
	  return results;
	}
};



module.exports = new Util();
