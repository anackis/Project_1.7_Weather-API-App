const express = require("express");
const https = require("https");
// body parser needed for form post data resive 
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {

	res.sendFile(__dirname + "/index.html");
	
});


app.post("/", function(req, res) {
	// console.log(req.body.cityName);
	const query = req.body.cityName;
	const apiKey = "93d2fb9ae6c87f261dbc84deecff5a3a";
	const unit = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey 

	https.get(url, function(response) {
		console.log(response);
		response.on("data", function(data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp ;
			const weatherDescription = weatherData.weather[0].description ;
			const icon = weatherData.weather[0].icon ;
			const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;
			res.write("<p>The weather is currently " + weatherDescription + "</p>");
			res.write("<h1>The temperature in " + query + " is " + temp + "degrees Celcius.</h1>");
			res.write("<img src=" + imageUrl + ">");
			res.send();
		});
	});
});










app.listen(3000, function() {
	console.log("Server has just started on port 3000");
});



