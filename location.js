if(Modernizr.geolocation){
	$("#button").click(function(){
		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition,showError);
	    } else { 
	        $("#demo").html("Geolocation is not supported by this browser.");
	    }
	});

function showPosition(position) {
    
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    $("#demo").html( "<img src='"+img_url+"'>");
    $("#demo").append("<div>\nlatitude: " + position.coords.latitude + " longitude: " + position.coords.longitude+ "</div>");
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $("#demo").html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#demo").html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#demo").html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $("#demo").html("An unknown error occurred.");
            break;
    }
}
}else{
	$("#button").click(function(){
		(function(geolocation){
		 
		  if (geolocation) return;
		  
		  var cache;
		  
		  geolocation = window.navigator.geolocation = {};
		  geolocation.getCurrentPosition = function(callback){
		    
		    if (cache) callback(cache);
		    
		    $.getScript('//www.google.com/jsapi',function(){
		      
		     // sometimes ClientLocation comes back null
		     if (google.loader.ClientLocation) {
		      cache = {
		        coords : {
		          "latitude": google.loader.ClientLocation.latitude, 
		          "longitude": google.loader.ClientLocation.longitude
		        }
		      };
		     }
		      
		      callback(cache);
		    });
		    
		  };
		  
		  geolocation.watchPosition = geolocation.getCurrentPosition;
		 
		})(navigator.geolocation);
		 
		 
		 
		
		navigator.geolocation.watchPosition(function(pos){
		  $("#demo").html("I'm located at ",pos.coords.latitude,' and ',pos.coords.longitude);
		});
	});
}
