// $("#total-deaths").click(function(event) {
// var referToThis = event.target.value
// console.log(referToThis)
// })

$(document).on("click", ".input-search", function (event) {
    // Empty Modal in case api is still loading
    // $(".modal-body").empty();
    var countryName = $(this).data("country");
    var stateName = $(this).data("state");
    console.log(stateName);
    // If element does not have attribute data-state, set to empty string
    if (stateName === undefined) {
        stateName = "";
    }

    // Create the query
    var query = countryName + " " + stateName;
    
    var locationAPI = {
        "async": true,
        "crossDomain": true,
        // "url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + value,
        "url": "https://tripadvisor1.p.rapidapi.com/locations/search?limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&query=" + query,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a"
        }
    }

    $.ajax(locationAPI).done(function (response) {
        // console.log(response.data[0].result_object.location_id);
        console.log(response);
        var HotelApi = {
            "async": true,
            "crossDomain": true,
            "url": "https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=" + response.data[0].result_object.location_id + "&adults=1&checkin=%3Crequired%3E&rooms=1&nights=2",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "d60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a"
            }
        }

        $.ajax(HotelApi).done(function (response) {
            // used to not pick the same number twice
            console.log(response.data.length)
            var values = [];
            for (var i = 1; i <= response.data.length; ++i){
                values.push(i);
            }
            for (var i = 0; i < 3; i++) {
                try {
                    // generate a random number
                    var rand = values.splice(Math.random() * values.length, 1)[0];
                    $("#loader-" + (i + 1)).css("display", "none");
                    $("#hotel-card-" + (i + 1)).css("display", "block");
                    $("#hotel-card-" + (i + 1) + "-title").html("Country: <span class='text-success'>" + countryName);
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-name'> <span class='text-secondary'>Hotel Name:</span> " + response.data[rand].name + "</div>")
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-price'> <span class='text-secondary'>Price:</span> " + response.data[rand].price + "</div>")
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-rating'> <span class='text-secondary'>Rating:</span> " + response.data[rand].rating + "</div>")
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-reviews'> <span class='text-secondary'>Number of Reviews:</span> " + response.data[rand].num_reviews + "</div>")
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-location'> <span class='text-secondary'>Location:</span> " + response.data[rand].location_string + "</div>")
                    $("#hotel-card-" + (i + 1) + "-img").attr("src", response.data[rand].photo.images.large.url)
                } catch(err) {
                    for (var i = 0; i < 3; i++) {
                        $("#loader-" + (i + 1)).css("display", "none");
                    }
                    $(".modal-title").html("<h5><span class='text-danger'>Results not found</span></h5>");   
                }
            }
            console.log("success")
        });
    }).fail(function() {
        for (var i = 0; i < 3; i++) {
            $("#loader-" + (i + 1)).css("display", "none"); 
        }  
        $(".modal-title").html("<h5><span class='text-danger'>API error</span></h5>");   
    })
})
//hide demo button.
$("#modal-close").on("click", function (event) {
    $(".modal-title").html("Hotel Listings"); 
    for (var i = 0; i < 3; i++) {
        $("#hotel-card-"+(i+1)).css("display", "none");
        $("#hotel-card-"+(i+1)+"-title").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-img").attr("src", "")
        $("#loader-"+(i+1)).css("display", "block");
    }
});

$("#hotel-modal-close").on("click", function(event) {
    $(".modal-title").html("Hotel Listings"); 
    for (var i = 0; i < 3; i++) {
        $("#hotel-card-"+(i+1)).css("display", "none");
        $("#hotel-card-"+(i+1)+"-title").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-img").attr("src", "")
        $("#loader-"+(i+1)).css("display", "block");
    }
})