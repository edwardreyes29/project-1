/* COVID-19 Statistics API */

// total
var total = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-19-statistics.p.rapidapi.com/reports/total?date=2020-04-07",
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

// reports - iso & name (country)
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

// reports
// "url": "https://covid-19-statistics.p.rapidapi.com/reports?region_province=Alabama&iso=USA&region_name=US&city_name=Autauga&date=2020-04-16&q=US%20Alabama"
var reports = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=USA", // iso = USA
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
		"x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
	}
}

$.ajax(reports).done(function (response) {
    console.log(response);
    // console.log(response.data[0].confirmed);
    var usaTotalConfirmed = 0;
    for (var i = 0; i < response.data.length; i++) {
        usaTotalConfirmed += response.data[i].confirmed;
    }
    console.log("USA total confirmed cases: " + usaTotalConfirmed);
});

var totalConfirmedCases = [];
// Get total from each country
$.ajax(regions).done(function (regionsData) {
    console.log(regionsData);
    console.log(regionsData.data[0].iso);
    for (var i = 0; i < regionsData.data.length; i++) {
        if (regionsData.data[i].iso !== 'undefined') {
            var reports = {
                "async": true,
                "crossDomain": true,
                "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=" + regionsData.data[i].iso, 
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
                    "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
                }
            }
            $.ajax(reports).done(function (response) {
                var total = 0;
                for (var j = 0; j < response.data.length; j++) {
                    total += response.data[j].confirmed;
                }
                try {
                    console.log(response.data[0].region.iso + ": " + total);
                } catch(err) {
                    console.log("ooopps");
                }
            });
        }       
    }    
});


// $.ajax(total).done(function (response) {
// 	console.log(response);
// });



// $.ajax(provinces).done(function (response) {
//     console.log(response);
// });



// $.ajax(regions).done(function (response) {
// 	console.log(response);
// });