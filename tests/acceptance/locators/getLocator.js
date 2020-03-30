
var yaml = require('js-yaml');
var fs = require('fs');
var ObjectRepo = yaml.load(fs.readFileSync('tests/acceptance/locators/common/ElementLocators.yml'));

export function getLocator(element, page){
	try{
		var sLocatorValue = ObjectRepo[page][element];

		if(sLocatorValue === undefined){
			console.error(element + ' object not defined properly in OR ', '..', '..');
		}
		else if (sLocatorValue === null){
			console.error(element + ' object pair is missing in OR ', '..', '..');
		}
		else{
			return sLocatorValue;
		}
	}
	catch(err){
		console.error('Error while reading OR', '..', '..');
		console.log(err);
	}
}
//getLocator('LoginPage', 'Username');
//exports.getLocator = getLocator;
