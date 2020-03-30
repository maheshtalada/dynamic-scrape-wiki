import { concat, uniqBy } from 'lodash';
import { mediaTabsConfig } from '../assets/static/media-drop-zone-tabs.json';

/*
	@param media Object
 */

export function getTabImages(currentData, uploadedData, currentTab) {
	const dataKey = mediaTabsConfig[currentTab.toUpperCase()].DATA_KEY;
	if(currentData[dataKey]) {
		currentData[dataKey] = uniqBy(uploadedData.concat(currentData[dataKey]), 'uri');
		return currentData;
	}
	currentData[dataKey] = uniqBy(uploadedData, 'uri');
	return currentData;

}

/*module.exports = {
	getTabImages
};*/
