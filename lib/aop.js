module.exports.wrap = function(that, target, aspect) {
	var params = Array.prototype.slice.call(arguments, 3);
	var wrapper = function() { aspect.apply(that, [target, arguments].concat(params)); }
	return wrapper;
};