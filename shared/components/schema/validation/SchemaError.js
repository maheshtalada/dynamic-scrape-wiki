export default class SchemaError extends Error {
	constructor(message) {
		super(message);

		this.isSchemaError = true;
	}
}
