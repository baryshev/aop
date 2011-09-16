module.exports.wrap = function(that, target, aspect) {
	var params = Array.prototype.slice.call(arguments, 3);
	var wrapper = function() { params.unshift(target, arguments); aspect.apply(that, params); }
	return wrapper;
};