async function getReportsData(url) 
{   
    let response = await fetch(url);
    let data = await response.json()
    // console.log(data)
    return data;
}


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
    .defer(d3.csv, "plots.csv") // Position of circles
    .await(ready);

function ready(error, dataGeo, data) {

    // Create a color scale
    var allContinent = d3.map(data, function (d) { return (d.homecontinent) }).keys()
    // console.log(allContinent)
    var color = d3.scaleOrdinal()
        .domain(allContinent)
        .range(d3.schemePaired);

    // Add a scale for bubble size
    var valueExtent = d3.extent(data, function (d) { return +d.n; })
    // console.log(valueExtent);
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
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "black")
        .style("opacity", .3)
        

    // Add circles:
    svg
        .selectAll("myCircles")
        .data(data.sort(function (a, b) { return +b.n - +a.n }).filter(function (d, i) { return i < 1000 }))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return projection([+d.homelon, +d.homelat])[0] })
        .attr("cy", function (d) { return projection([+d.homelon, +d.homelat])[1] })
        .attr("r", function (d) { return size(+d.n) / 4})
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
// 