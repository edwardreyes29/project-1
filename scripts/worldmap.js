var reports = {
    "async": false,
    "crossDomain": true,
    "url": "https://covid-19-statistics.p.rapidapi.com/reports",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
    }
}

var jsonData = []; // to store lat, long, and confirmed cases for each province.
$.ajax(reports).done(function (response) {
    for (var i = 0; i < response.data.length; i++) {
        // create a new object to push into the jsonData array
        var newObject = { homelat: response.data[i].region.lat, homelon: response.data[i].region.long, n: response.data[i].confirmed };
        jsonData.push(newObject);
    }
});

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .center([0, 20])                // GPS of location to zoom on
    .scale(99)                       // This is like the zoom
    .translate([width / 2, height / 2])

d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
    .await(ready);

function ready(error, dataGeo) {
    // Add a scale for bubble size
    var valueExtent = d3.extent(jsonData, function (d) { return +d.n; })

    var size = d3.scaleSqrt()
        .domain(valueExtent)  // What's in the data
        .range([1, 50])  // Size in pixel

    // Draw the world map
    svg.append("g")
        .selectAll("path")
        .data(dataGeo.features)
        .enter()
        .append("path")
        .attr("fill", "#b8b8b8")
        .attr("data-country", function(d) {
            return d.properties.name;
        })
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "black")
        .style("opacity", .3)


    // Add circles:
    svg
        .selectAll("myCircles")
        .data(jsonData.sort(function (a, b) { return +b.n - +a.n }).filter(function (d, i) { return i < 1000 }))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return projection([+d.homelon, +d.homelat])[0] })
        .attr("cy", function (d) { return projection([+d.homelon, +d.homelat])[1] })
        .attr("r", function (d) { return (size(+d.n) / 4 )})
        // .attr("r", 3)
        .style("fill", "red")
        .attr("stroke", function (d) { if (d.n > 2000) { return "black" } else { return "none" } })
        // .attr("stroke", none)
        .attr("stroke-width", 0.5)
        .attr("fill-opacity", .4)

    // Add title and explanation
    svg
        .append("text")
        .attr("text-anchor", "end")
        .style("fill", "black")
        .attr("x", width - 10)
        .attr("y", height - 30)
        .attr("width", 90)
        .html("Confirmed Cases Worldwide")
        .style("font-size", 14)

    // Add legend: circles
    var valuesToShow = [10000, 100000, 1000000]
    var xCircle = 40
    var xLabel = 90
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function (d) { return height - (size(d) / 1.5)})
        .attr("r", function (d) { return (size(d) / 4) })
        .style("fill", "red")
        .attr("stroke", "black")
        .attr("fill-opacity", .4)

    // Add legend: segments
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
        .attr('x1', function (d) { return xCircle + (size(d) / 4) })
        .attr('x2', xLabel)
        .attr('y1', function (d) { return height - (size(d) / 1.5)})
        .attr('y2', function (d) { return height - (size(d) / 1.5)})
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("text")
        .attr('x', xLabel)
        .attr('y', function (d) { return height - (size(d) / 1.5)})
        .text(function (d) { return formatNumber(d) })
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')
}




/*Code used to create csv file for plots*/
// var regions = {
//     "async": false,
//     "crossDomain": true,
//     "url": "https://covid-19-statistics.p.rapidapi.com/regions",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
//         "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
//     },
// }

// $.ajax(regions).done(function(regionsData) {
//     var countryPlots = [];
//     for (var i = 0; i < regionsData.data.length; i++) {

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
//         $.ajax(reports).done(function (reportsData) {
//             try {
//                 for (var j = 0; j < reportsData.data.length; j++) {
//                     console.log(reportsData.data[j].region.lat+ ',' + reportsData.data[j].region.long + ',' + reportsData.data[j].confirmed);
//                 }  
//             } catch (err) {
//                 // do nothing
//             }
//         }); 
//     }
//     // console.log(countryPlots);
// })

// const regions_url = "https://covid-19-statistics.p.rapidapi.com/regions?rapidapi-key=73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
// async function getRegionData() 
// {   
//     var countryPlots = [];
//     let response = await fetch(regions_url);
//     let regionsData = await response.json()

//     for (var i = 0; i < regionsData.length; i++) {
//         // console.log(data)
//         const report_url = "https://covid-19-statistics.p.rapidapi.com/reports?rapidapi-key=73403c6c67msha0632541172766bp194ccejsn820ec377a86a&iso=" + regionsData.data[0].iso;
//         var reportData = await getReportsData(report_url);
//         for (var j = 0; j < reportData.data.length; j++) {
//             countryPlots.push({homelat: reportData.data[j].region.lat, homelon: reportData.data[j].region.long, n: reportData.data[j].confirmed});
//         }   
//     }
//     console.log(countryPlots);
// }

// This function formats numbers with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
