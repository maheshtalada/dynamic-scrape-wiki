/*
    eslint
        import/no-commonjs: 0
*/

require('./app.js');

// TODO adding pollyfill here move it later
Array.prototype.chunk = function( n ) {
	if ( !this.length ) {
		return [];
	}
	return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
};

