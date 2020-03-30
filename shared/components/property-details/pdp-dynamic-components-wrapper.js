import StreetView from './streetview';

const StreetViewWrapper = ({ details})=> {
	const { address, formattedAddress } = details.property;
	const latlng = { lat : address.geometry.lat, lng : address.geometry.lon };
	return <StreetView latlng={latlng} address={formattedAddress}/>
};


export default StreetViewWrapper
