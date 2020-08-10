var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-19-news.p.rapidapi.com/v1/covid?lang=en&media=True&q=covid",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-news.p.rapidapi.com",
		"x-rapidapi-key": "9564c8d290msh40fef144dfa918bp12886fjsn36d7ad8e50e1"
	}
}
$.ajax(settings).done(function (response) {
    console.log(response);
    

$("#card1-news").append(response.articles[0].link);
$("#card2-news").append(response.articles[1].link);
$("#card3-news").append(response.articles[9].link);
$("#card4-news").append(response.articles[10].link);
$("#card5-news").append(response.articles[4].link);
$("#card6-news").append(response.articles[5].link);



$("#card1-title").append(response.articles[0].title)
$("#card2-title").append(response.articles[1].title)
$("#card3-title").append(response.articles[9].title)
$("#card4-title").append(response.articles[10].title)
$("#card5-title").append(response.articles[4].title)
$("#card6-title").append(response.articles[5].title)


$("#card-1-img").attr("src", response.articles[0].media)
$("#card-2-img").attr("src", response.articles[1].media)
$("#card-3-img").attr("src", response.articles[9].media)
$("#card-4-img").attr("src", response.articles[10].media)
$("#card-5-img").attr("src", response.articles[4].media)
$("#card-6-img").attr("src", response.articles[5].media)


$("#card-1-img").attr("style", "height: 50%;")
$("#card-2-img").attr("style", "height: 50%;")
$("#card-3-img").attr("style", "height: 50%;")
$("#card-4-img").attr("style", "height: 50%;")
$("#card-5-img").attr("style", "height: 50%;")
$("#card-6-img").attr("style", "height: 50%;")







/*for(let i = 0; i < 10; i++) {
    $(".carousel-inner").append(`<div><div><h1>Hello World this many times ${i}</h1></div</div>`)
}*/


});