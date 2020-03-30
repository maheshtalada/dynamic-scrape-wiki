/*import { areasServed } from '../assets/static/metros-served-config';*/
import { find as _find } from 'lodash';
const { areasServed } =  require('../assets/static/metros-served-config').default;


export function offsetCenter(latlng,offsetx,offsety,map) {

// latlng is the apparent centre-point
// offsetx is the distance you want that point to move to the right, in pixels
// offsety is the distance you want that point to move upwards, in pixels
// offset can be negative

	var scale = Math.pow(2, map.getZoom());
	var nw = new google.maps.LatLng(
		map.getBounds().getNorthEast().lat(),
		map.getBounds().getSouthWest().lng()
	);

	var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
	var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0);

	var worldCoordinateNewCenter = new google.maps.Point(
		worldCoordinateCenter.x - pixelOffset.x,
		worldCoordinateCenter.y + pixelOffset.y
	);

	var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

	map.setCenter(newCenter);

}

export function getMetroServed(id) {
	return _find(areasServed,{'metroID': Number(id || 1)}) || _find(areasServed,{'isDefaultMetro': true})
}

