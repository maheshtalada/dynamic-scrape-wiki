import Jed from 'jed';
import clientConfig from '../config';

export function getSupportedLocales(country) {
	const { langauges } = clientConfig.localeSettings[country];
	return langauges && langauges.map((language)=>{
		return { [language.language] : language.displyname };
	});
}

export function sprintf(text, ...params) {
	return Jed.sprintf(text, ...params);
}
