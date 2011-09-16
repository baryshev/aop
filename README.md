# About 
Simple AOP realization for async applications.

# Installation

	npm install aop

# Example

```js
var aop = require("aop");

var cache = {};

var someAsyncFunction = function fnName(num, callback) {
	console.log("calculating");
	var result = num * 2;
	callback(null, result);
	cache[num] = result;
};

var cacheAspect = function(method, params) {
	console.log(this.name);
	var num = params[0];
	if (cache[num]) {
		var callback = params[params.length - 1];
		console.log("using cached value");
		callback(null, cache[num]);
	} else {
		method.apply(this, params);
	}
};

var changeAspect = function(method, params) {
	console.log(this.name);
	params[0]++;
	method.apply(this, params);
};

var formatAspect = function(method, params) {
	console.log(this.name);
	var callback = params[params.length - 1];
	var newCallback = function(error, result) {
		callback(error, result + "s");
	};
	params[params.length - 1] = newCallback;
	method.apply(this, params);
};

someAsyncFunction = aop.wrap(someAsyncFunction, someAsyncFunction, cacheAspect);
someAsyncFunction = aop.wrap(someAsyncFunction, someAsyncFunction, formatAspect);
someAsyncFunction = aop.wrap(someAsyncFunction, someAsyncFunction, changeAspect);

someAsyncFunction(2, function(error, result) {
	console.log(result);
});

someAsyncFunction(2, function(error, result) {
	console.log(result);
});
```
