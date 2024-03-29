(function(console){
	var _log = console.log;
	var _error = console.error;
	var _warning = console.warning;

	console.error = function(errMessage){
		ImaginarySendMailErrorMethod(errMessage);// Send a mail with the error description
		_error.apply(console,arguments);
	};

	console.log = function(logMessage){
		if
		// Do something with the log message
		_log.apply(console,arguments);
	};

	console.warning = function(warnMessage){
		// do something with the warn message
		_warning.apply(console,arguments);
	};

})(window.console);
