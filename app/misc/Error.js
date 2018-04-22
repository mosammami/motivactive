function CustomError(type, message) {
	Error.call(this);

	this.type = type || 'ServerError';
	this.message = message || 'Default Message';

	var stack = new Error().stack;
	if (typeof stack === 'string') {
        stack = stack.split('\n');
        stack.shift();
        this.stack = stack.join('\n');
    }
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;