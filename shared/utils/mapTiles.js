var map;
var geocoder;
var imageMapType;
var ZIP_MAPTYPE_ID = 'ziphybrid';
var chkar = [ ] ;					// Zips Found
var zipar = [ ] ;					// Zips Found
var marar = [ ] ;					// Marker Array
var icons = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] ;
var lastclick = "" ;					// Last Clicked Point
var infowindow ;
var defWidth = 1081 ;
var defHeight = 762 ;
var winWidth = defWidth;
var winHeight = defHeight ;

var tskey = "c743eba665" ;

function initialize() {
	// Sizing section...

	if ( typeof( window.innerWidth ) == 'number' )
	{
		// Modern Browser...

		winWidth = window.innerWidth;
		winHeight = window.innerHeight;
	}

	if ( winWidth < 836 ) { winWidth = 836; }
	if ( winHeight < 630 ) { winHeight = 630; }

	var diffHeight = winHeight - defHeight ;
	var diffWidth = winWidth - defWidth ;

	sizeDiv("main",diffWidth,diffHeight) ;
	sizeDiv("map-canvas",diffWidth,diffHeight) ;
	sizeDiv("sidebar",0,diffHeight) ;
	sizeDiv("message",0,diffHeight) ;

	geocoder = new google.maps.Geocoder();

	imageMapType = new google.maps.ImageMapType({
		getTileUrl: function(coord, zoom) {
			if (zoom < 5 || zoom > 18 ) {
				return null;
			}
			if (zoom <= 13 ) {
				var url = "http://storage.googleapis.com/zipmap/tiles/" + zoom + "/" + coord.x + "/" + coord.y + ".png" ;
				return url ;
			}
			var server = coord.x % 6 ;
			var url = "http://ts" + server + ".usnaviguide.com/tileserver.pl?X=" + coord.x + "&Y=" + coord.y + "&Z=" + zoom + "&T=" + tskey + "&S=Z1001" ;
			return url ;
		},
		tileSize: new google.maps.Size(256, 256),
		opacity:.5,
		name:ZIP_MAPTYPE_ID
	});

	var mapOptions = {
		minZoom: 5,
		maxZoom: 18,
		zoom: 5,
		center: new google.maps.LatLng(35, -89),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	map.overlayMapTypes.push(imageMapType);

	google.maps.event.addListener(map, 'click', function(e) {
		zippoly(e.latLng,'');
	});
	infowindow = new google.maps.InfoWindow();
}

// Recalculate div sizes...

function sizeDiv(id,diffWidth,diffHeight)
{
	var div = document.getElementById(id) ;

	var width = parseInt(div.style.width) + diffWidth ;
	if (width >= 1 )
	{
		div.style.width = width + "px";
	}

	var height = parseInt(div.style.height) + diffHeight ;
	if (height >= 1 )
	{
		div.style.height = height + "px";
	}
}

// Find a zip code and cause it to be drawn on the map...

function findzip( zipcode )
{
	if ( zipcode.address.value )
	{
		showAddress(zipcode.address.value) ;
	} else if ( CheckZip( zipcode.zip.value ) > -1 )
	{
		alert("Zip Code Keyed Has Already Been Selected.") ;
	} else
	{
		zippoly( 0, zipcode.zip.value ) ;
	}
}

// Clear overlays, Div area and restore map...

function clearmap( zipcode )
{
	zipcode.zip.value = "" ;
	document.getElementById("message").innerHTML = "" ;
	for (var i = 0; i < marar.length; i++)
	{
		marar[i].setMap(null);
	}
	lastclick = "" ;
	zipar = [ ] ;
	chkar = [ ] ;
	marar = [ ] ;
}

// Check for a double click...

function checkclick ( point )
{
	if ( lastclick != point )
	{
		lastclick = point ;
		zippoly( point, '' ) ;
	}
}

// Open an Infowindow when the zip link is clicked in the message div...

function zipLink(zip)
{
	for (var i = 0; i < zipar.length; i++)
	{
		if ( zipar[i] == zip )
		{
			break ;
		}
	}
	google.maps.event.trigger(marar[i], 'click') ;
}

// Check to see if a Zip has already been selected...

function CheckZip(zip)
{
	for (var i = 0; i < chkar.length; i++)
	{
		if ( chkar[i] == zip )
		{
			return(i) ;
		}
	}
	return(-1) ;
}

// Find a zip code and return the coordinates along with other information...

function zippoly( point, zip )
{
	if (window.XMLHttpRequest)
	{		// code for IE7+, Firefox, Chrome, Opera, Safari
		var request = new XMLHttpRequest() ;
	} else
	{		// code for IE6, IE5
		var request = new ActiveXObject("Microsoft.XMLHTTP") ;
	}

	var parms = "POINT=" + point ;
	if ( zip )
	{
		parms = "ZIP=" + zip ;
	}
	request.open("POST", "zip.pl", true);
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded') ;	// Thanks to Darkstar 3D!
	request.onreadystatechange = function()
	{
		document.getElementById("loading").innerHTML = "Loading, please wait..." ;

		if (request.readyState == 4)
		{
			var xmlDoc = request.responseXML ;
			try
			{
				if ( marar.length == 0 )
				{
					document.getElementById("message").innerHTML = "" ;
				}
				var info = xmlDoc.documentElement.getElementsByTagName("info") ;
				var zipcode = info[0].getAttribute("zipcode") ;
				var hitrem = parseInt(info[0].getAttribute("hitrem")) ;
				if ( hitrem <= 1 )
				{
					alert("You have exhausted your requests for this time period. Please come back in 2 hours.") ;
				} else if ( zipcode == "" )
				{
					alert("Area clicked not defined by a zip code") ;
				} else
				{
					var zipindex = CheckZip( zipcode ) ;
					if ( zipindex > -1 )
					{
						google.maps.event.trigger(marar[zipindex], "click") ;
					} else
					{
						var lastpoint	= map.getCenter() ;
						var point	= lastpoint ;
						var zipname	= info[0].getAttribute("zipname") ;
						var uspsst	= info[0].getAttribute("uspsst") ;
						var stname	= info[0].getAttribute("stname") ;
						var ctyname	= info[0].getAttribute("ctyname") ;
						var county	= info[0].getAttribute("county") ;
						var complex	= info[0].getAttribute("complex") ;
						var hh		= info[0].getAttribute("hh") ;
						var hhest	= info[0].getAttribute("hhest") ;
						var pointzip	= info[0].getAttribute("pointzip") ;

						chkar.push(zipcode) ;
						var points = [] ;
						var markers = xmlDoc.documentElement.getElementsByTagName("marker1");
						for (var i = 0; i < markers.length; i++)
						{
							point = new google.maps.LatLng(parseFloat(markers[i].getAttribute("lat")),parseFloat(markers[i].getAttribute("lng"))) ;
							html	= "<div style='width:200px; text-align:left;'><b>Zip Code:</b> " + zipcode +
								"<br>" + zipname +
								"<br>" + uspsst + " - " + stname +
								"<br>County: " + county + " - " + ctyname +
								"<br>Area Code(s): " + complex +
								"<br>2000 Households: " + hh +
								"<br>2008 Households: " + hhest ;
							if ( pointzip == 1 )
							{
								html += "<br>Point Zip - Not Mapped" ;
							}

							html	+= "</div>" ;
							var number = marar.length ;
							if ( number > icons.length )
							{
								number = icons.length ;
							}
							marar.push( createMarker( point, html, number ) ) ;
							zipar.push(zipcode + "A") ;
							var html = icons[number] + " <a href=\"javascript:zipLink('" + zipcode + "A" + "')\">" + zipcode ;
							html += "</a><br>&nbsp;" + zipname + ", " + uspsst + "<br>&nbsp;2008 Households: " + hhest + "<br>" ;
							document.getElementById("message").innerHTML =  html + document.getElementById("message").innerHTML ;
						}
						if ( point != lastpoint )
						{
							if( chkar.length > 1 )
							{
								map.setCenter( point ) ;
							} else
							{
								map.setCenter( point ) ;
								map.setZoom( 13 ) ;
							}
						}
					}
				}
			} catch(e)
			{
				alert("Some error occured during program processing:" + e) ;
			}
			document.getElementById("loading").innerHTML = "" ;
		}
	}
	request.send(parms);
}

// Create a marker at a point with an infowindow...

function createMarker(point, html, number)
{
	var image = { url: 'http://www.google.com/intl/en_us/mapfiles/marker' + icons[number] + '.png' } ;
	var marker = new google.maps.Marker(
		{
			position: new google.maps.LatLng(point.lat(), point.lng()),
			icon: image,
			map: map
		});

	google.maps.event.addListener(marker, 'click', (function (marker, number)
	{
		return function ()
		{
			infowindow.setContent(html);
			infowindow.open(map, marker);
		}
	})(marker, number));

	return marker;
}

// Find the address using the geocoder...

function showAddress(address)
{
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var latLng = results[0].geometry.location ;
			zippoly('(' + latLng.lat().toFixed(6) + ',' + latLng.lng().toFixed(6) + ')') ;
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}

// Hide the Zip Code overlay...

function zipLayer()
{
	if ( document.getElementById("zipLayerBox").checked )
	{
		imageMapType.set('opacity', 0.5);
	} else
	{
		imageMapType.set('opacity', 0);
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
