/* COVID-19 Statistics API */
// total
//Commented out for example - Nick
var total = {
    "async": true,
    "crossDomain": true,
    "url": "https://covid-19-statistics.p.rapidapi.com/reports/total",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
    }
}

// provinces - iso, province, name, requires iso's
var provinces = {
    "async": true,
    "crossDomain": true,
    "url": "https://covid-19-statistics.p.rapidapi.com/provinces?iso=CHN",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
    }
}


// regions - iso & name (country)
var regions = {
    "async": true,
    "crossDomain": true,
    "url": "https://covid-19-statistics.p.rapidapi.com/regions",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
    },
}

// Get total of confirmed cases from each country and append it to total confirmed
$.ajax(regions).done(function (regionsData) {
    var totalConfirmedCases = [];
    for (var i = 0; i < 50; i++) {
        // console.log(regionsData.data[i].iso);
        var reports = {
            "async": true,
            "crossDomain": true,
            "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=" + regionsData.data[i].iso,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
                "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
            },
        }
        $.ajax(reports).done(function (response) {
            var total = 0;
            for (var j = 0; j < response.data.length; j++) {
                total += response.data[j].confirmed;
            }
            try {
                var caseString = "";
                caseString = total + ": " + response.data[0].region.iso;
                totalConfirmedCases.push(caseString);
                $("#total-cases-country").append("<span class='total-number-country'>" + formatNumber(total) + "</span> " + response.data[0].region.name + "</br>")
            } catch (err) {
                // do nothing
            }
        });
    }

});

// Display world wide number of confirmed cases
$.ajax(total).done(function (response) {
    // console.log(response);
    $(".total-cases-title").html("Total Confirmed <br><span class='total-number'>" + formatNumber(response.data.confirmed));
});

// This function formats numbers with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

regionsNonSync = {
    "async": false,
    "crossDomain": true,
    "url": "https://covid-19-statistics.p.rapidapi.com/regions",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
    },
}

//Covid Deaths by Country
var totalConfirmedDeaths = [];
// $.ajax(regionsNonSync).done(function (regionsData) {
//     var totalConfirmedCases = [];
//     for (var i = 0; i < 50; i++) {

//         var reports = {
//             "async": false,
//             "crossDomain": true,
//             "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=" + regionsData.data[i].iso,
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
//                 "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
//             },
//         }
//         $.ajax(reports).done(function (response) {


//             var total = 0;
//             for (var j = 0; j < response.data.length; j++) {
//                 total += response.data[j].deaths;

//             }
//             try {
//                 var caseObject = { name: response.data[0].region.iso, countrytotal: total }
//                 totalConfirmedDeaths.push(caseObject);

//             } catch (err) {
//                 // do nothing
//             }
//         });
//     }

// });

totalConfirmedDeaths.sort(function (a, b) {
    return b.countrytotal - a.countrytotal;

});


async function asyncCall() {
    for (var i = 0; i < totalConfirmedDeaths.length; i++) {

        $("#total-deaths").append("<span class='total-number-country'>" + totalConfirmedDeaths[i].countrytotal + "</span> " + totalConfirmedDeaths[i].name + "</br>")
    }
}

asyncCall()

//Code for US Map is below this line - Nick

$("#click-usa").click(function () {

    $("#total-cases-country").empty();
    $("#total-deaths").empty();
    usMap();

    function usMap() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://coronavirus-us-api.p.rapidapi.com/api/state/all?source=nyt",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-us-api.p.rapidapi.com",
                "x-rapidapi-key": "d60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a"
            }
        }
        //Ajax call for US Cases
        $.ajax(settings).done(function (response) {
            console.log(response.locations[0]);

            var total = 0;
            for (var i = 0; i < response.locations.length; i++) {
                total += response.locations[i].latest.confirmed;

            }
            try {
                var caseObject = { name: response.location[0].latest.confirmed, countrytotal: total } //need to ask ed about this line
                totalConfirmedDeaths.push(caseObject); //need to ask ed about this line

            } catch (err) {
                // do nothing
            }

            asyncCall2();

            async function asyncCall2() {
                for (var i = 0; i < response.locations.length; i++) {

                    $("#total-cases-country").append("<span class='total-number-state'>" + response.locations[i].state + "</span> " + response.locations[i].latest.confirmed + "</br>")
                }
            }

        });


        //Ajax call for US Deaths
        $.ajax(settings).done(function (response) {
            console.log(response.locations[0]);

            var total = 0;
            for (var i = 0; i < response.locations.length; i++) {
                total += response.locations[i].latest.deaths;

            }
            try {
                var caseObject = { name: response.location[0].latest.deaths, countrytotal: total } //need to ask ed about this line
                totalConfirmedDeaths.push(caseObject); //need to ask ed about this line

            } catch (err) {
                // do nothing
            }

            asyncCall3();

            async function asyncCall3() {
                for (var i = 0; i < response.locations.length; i++) {

                    $("#total-deaths").append("<span class='total-number-state'>" + response.locations[i].state + "</span> " + response.locations[i].latest.deaths + "</br>")
                }
            }
        });
    }
});

//code for US Map is above this line
//Old Code --- ignore everything below here

$.ajax(regions).done(function (regionsData) {
    var totalConfirmedCases = [];
    for (var i = 0; i < 50; i++) {

        var reports = {
            "async": true,
            "crossDomain": true,
            "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=" + regionsData.data[i].iso,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
                "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
            },
        }
        $.ajax(reports).done(function (response) {


            var total = 0;
            for (var j = 0; j < response.data.length; j++) {
                total += response.data[j].deaths;
                // console.log(response.data[j].deaths)
            }
            try {
                var caseString = "";
                caseString = total + ": " + response.data[0].region.iso;
                totalConfirmedCases.push(caseString);
                $("#total-deaths").append("<span class='total-number-country'>" + formatNumber(total) + "</span> " + response.data[0].region.name + "</br>")
            } catch (err) {
                // do nothing
            }
        });
    }

});