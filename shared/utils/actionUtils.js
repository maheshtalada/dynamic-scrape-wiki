
export function getPayLoad(lookupArray, lookupObject){
	let payloadObject = {};
	lookupArray.forEach(( lookupItem)=>{
		let lookupItemSplit= lookupItem.lookup.split('.');
		const final = lookupItemSplit.reduce(( acc , cur) => ( acc && acc[cur] !== 'undefined' ?  acc[cur] : 'undefined'), lookupObject);
		payloadObject[lookupItem.key] =  final;
	});
	return payloadObject;
}



