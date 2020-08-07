// $("#total-deaths").click(function(event) {
// var referToThis = event.target.value
// console.log(referToThis)
// })

$(document).on("click", ".input-search", function(event) {
    console.log("hello");
    var value = $(this).data("state")
    console.log(value);



var locationAPI = {
	"async": true,
	"crossDomain": true,
	"url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + value,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "d60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a"
	}
}

$.ajax(locationAPI).done(function (response) {
    console.log(response.data[0].result_object.location_id);
    
    var HotelApi = {
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id="+ response.data[0].result_object.location_id + "&adults=1&checkin=%3Crequired%3E&rooms=1&nights=2",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a"
        }
    }


    
    $.ajax(HotelApi).done(function (response) {
        console.log(response.data[0].name);
        console.log(response.data[0].price);
        console.log(response.data[0].rating);
        console.log(response.data[0]);

        $(".modal-body").append("<div class='hotel-name'>" + "Hotel Name: " + response.data[0].name + "</div>")
        $(".modal-body").append("<div class='hotel-price'>" + "Price: " + response.data[0].price + "</div>")
        $(".modal-body").append("<div class='hotel-rating'>" + response.data[0].rating + "</div>")
        $(".modal-body").append("<div class='hotel-numreviews'>" + "Number of Reviews: " + response.data[0].num_reviews + "</div>")
        $(".modal-body").append("<div class='hotel-location'>" + response.data[0].location_string + "</div>")
        $(".modal-body").append("<img class='hotel-photo img-fluid'  src= '" + response.data[0].photo.images.small.url + "'/>")


       // $("#total-cases-country").append("<span class='total-number-state'>" + response.locations[i].state + "</span> " + response.locations[i].latest.confirmed + "</br>")

    });

});

})