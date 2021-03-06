// VARIABLE FOR FIRST COMMAND LINE INPUT

var firstInput = process.argv[2];
var secondInput = process.argv.slice(3);
var secondInputString = secondInput.join(" ");


// PULLS TWITTER KEYS FROM KEYS.JS FILE AND STORES AS VARIABLES

var keys = require('./keys.js');

var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessKey = keys.twitterKeys.access_token_key;
var accessSecret = keys.twitterKeys.access_token_secret;


// ACCESSES TWITTER PACKAGE USING PERSONAL TWITTER KEYS

var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: consumerKey,
	consumer_secret: consumerSecret,
	access_token_key: accessKey,
	access_token_secret: accessSecret
});

var params = {screen_name: 'visualcoder'};


// ACCESSES SPOTIFY PACKAGE

var spotify = require('spotify');


// ADDS REQUEST PACKAGE

var request = require('request');


// PULLS LAST 20 TWEETS AND DISPLAYS THEM IN THE CONSOLE

if (firstInput == 'my-tweets') {

client.get('statuses/user_timeline', params, function(error, tweets, response) {

	if (!error) {

	for (var i = 0; i < 20; i++) {
		console.log(tweets[i].created_at);
		console.log(tweets[i].text);
	}
}

});

} 


// DISPLAYS SPOTIFY INFORMATION BASED ON SONG NAME 

else if (firstInput == 'spotify-this-song' && secondInput.length > 0) {

	spotify.search({ type: 'track', query: secondInputString }, function(err, data) {

		if (err) {
			console.log('Error occured: ' + err);
			return;
		}

		console.log('Artist: ' + data.tracks.items[0].artists[0].name);
		console.log('Song Name: ' + data.tracks.items[0].name);
		console.log('Album: ' + data.tracks.items[0].album.name);
		console.log('Preview Link: ' + data.tracks.items[0].preview_url);
		

	});


}


// DEFAULTS TO ACE OF BASE IF THE SONG FIELD IS LEFT EMPTY

else if (firstInput == 'spotify-this-song' && secondInput.length == 0) {

	spotify.search({ type: 'track', query: 'The Sign', artist: 'Ace of Base' }, function(err, data) {

		if (err) {
			console.log('Error occured: ' + err);
			return;
		}

		for ( var i = 0; i < data.tracks.items.length; i++) {

			if (data.tracks.items[i].artists[0].name == 'Ace of Base') {

				console.log('Artist: ' + data.tracks.items[i].artists[0].name);
				console.log('Song Name: ' + data.tracks.items[i].name);
				console.log('Album: ' + data.tracks.items[i].album.name);
				console.log('Preview Link: ' + data.tracks.items[i].preview_url);

				return;
			}

		}

	});

}


// DISPLAYS MOVIE INFORMATION BASED ON MOVIE NAME

else if (firstInput == 'movie-this' && secondInput.length > 0) {

	request('http://www.omdbapi.com/?t=' + secondInputString + '&plot=short&r=json&tomatoes=true', function (error, response, body) {

		if (error) {
			console.log('Error occurred: ' + err);
			return;
		}

		console.log('Movie Title: ' + JSON.parse(body)["Title"]);
		console.log('Year: ' + JSON.parse(body)["Year"]);
		console.log('IMDB Rating: ' + JSON.parse(body)["imdbRating"]);
		console.log('Country: ' + JSON.parse(body)["Country"]);
		console.log('Language: ' + JSON.parse(body)["Language"]);
		console.log('Plot: ' + JSON.parse(body)["Plot"]);
		console.log('Actors: ' + JSON.parse(body)["Actors"]);
		console.log('Rotten Tomatoes Rating: ' + JSON.parse(body)["tomatoRating"]);
		console.log('Rotten Tomatoes URL: ' + JSON.parse(body)["tomatoURL"]);


	});

}


// DEFAULTS TO MR.NOBODY IF MOVIE INPUT IS LEFT BLANK

else if (firstInput == 'movie-this' && secondInput.length == 0) {

	request('http://www.omdbapi.com/?t=mr+nobody&plot=short&r=json&tomatoes=true', function (error, response, body) {

		if (error) {
			console.log('Error occurred: ' + err);
			return;
		}

		console.log('Movie Title: ' + JSON.parse(body)["Title"]);
		console.log('Year: ' + JSON.parse(body)["Year"]);
		console.log('IMDB Rating: ' + JSON.parse(body)["imdbRating"]);
		console.log('Country: ' + JSON.parse(body)["Country"]);
		console.log('Language: ' + JSON.parse(body)["Language"]);
		console.log('Plot: ' + JSON.parse(body)["Plot"]);
		console.log('Actors: ' + JSON.parse(body)["Actors"]);
		console.log('Rotten Tomatoes Rating: ' + JSON.parse(body)["tomatoRating"]);
		console.log('Rotten Tomatoes URL: ' + JSON.parse(body)["tomatoURL"]);


	});

}











