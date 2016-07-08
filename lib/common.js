/**
 * Extends one class with another.
 *
 * @param {Function} destination The class that should be inheriting things.
 * @param {Function} source The parent class that should be inherited from.
 * @return {Object} The prototype of the parent.
 */
function Util(){}

Util.prototype.extend = function extend(destination, source) {
    destination.prototype = Object.create(source.prototype);
    destination.prototype.constructor = destination;
    return source.prototype;
};

module.exports = new Util();
