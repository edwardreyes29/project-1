/* COVID-19 Statistics API */
// total
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
    for (var i = 0; i < regionsData.data.length; i++) {
        console.log(regionsData.data[i].iso);
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
            } catch(err) {
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