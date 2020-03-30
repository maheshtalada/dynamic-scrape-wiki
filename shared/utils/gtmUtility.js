/* import { gaTrackingCode } from '../config.js';

export function initialize() {
	ga('create', gaTrackingCode, 'auto');
}

export function navigate(pageData) {
	ga('set', pageData);
	ga('send', 'pageview');
}*/

/*
	GTM object

	 Page Attributes : {
	 	title , url , referrer, category , subcategory
	 }

	 Visitor Attributes : {
	 	Type, value , location, time stamp
	 }

	 event Atrributes : {
	 	Name, Actiion, label, value
	 }

	 var dataLayer = [{
	 “color”:”Caf\u00e9″,
	 “deviceAgent”:”Mozilla\/5.0 (Windows NT 6.3; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/35.0.1916.153 Safari\/537.36″
	 “deviceOs”:”non-mobile”,
	 “deviceTheme”:”desktop”,
	 “deviceType”:”desktop”,
	 “gender”:”Masculino”,
	 “googleRemarketingLabel”:””,
	 “image”:”http:\/\/static.dafyty.com.co\/p\/brahma-6338-0822-1-product.jpg”,
	 “pageAttributes”:{“page”:”product”},
	 “pageBrand”:[{“id”:”2″,”name”:”Brahma”}],
	 “pageCategory”:[
	 {“id”:”20″,”name”:”Zapatos”},
	 {“id”:”53″,”name”:”Masculino”},
	 {“id”:”57″,”name”:”Clasicos”},
	 {“id”:”138″,”name”:”Deportes”},
	 {“id”:”139″,”name”:”Masculino”},
	 {“id”:”201″,”name”:”Zapatos”},
	 {“id”:”1244″,”name”:”Mocasines”},
	 {“id”:”1340″,”name”:”Apaches”}
	 ],
	 “pageMainCategory”:”id”:”1340″,”name”:”Apaches”},
	 “pageName”:”product”,
	 “pageProductDescription”:”<i>Zapatos<\/i> <b>Brahma<\/b> cafe, elaborados en cuero con costuras visibles en la zona delantera la cual es redonda. Forro en cuero y suela en goma. Un calzado muy comodo que puedes combinar tanto con tus atuendos formales como informales.”,
	 “pageProductName”:”Zapatos Brahma Cafe”,
	 “pageTitle”:null,
	 “price”:”164900.00″,
	 “priceDiscount”:”12%”,
	 “season”:”Todas las temporadas”,
	 “seasonYear”:”2012″,
	 “shopAnalyticsAccount”:””,
	 “shopName”:”default”,
	 “sizeList”:””,
	 “sku”:”BR002SH19DJS”,
	 “specialPrice”:”144900.00″,
	 “urlPageProduct”:”http:\/\/www.dafiti.com.co\/Zapatos-Brahma-Cafe-280.html”,
	 }];


 */

function getTimeStamp() {

}

function getDevice() {

}

function getBrowser() {

}



export function sendToGTM(category, action, label, value) {

	if(typeof (window) !== 'undefined' ) {
		let dataLayer = window.dataLayer || [];
		dataLayer.push({
			'id' : 2,
			'name' : 'mahesh'
		});
	}
}
