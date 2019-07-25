require("dotenv").config();

//required in package-lock
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
moment().format();

var keys = require("./keys.js");
console.log(keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// search function
var command = process.argv[2];
// search value
var value = process.argv[3];

// switch cases for user inputs
switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};

//concert search api call function using axios
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {

                var datetime = response.data[i].datetime;

                var concertResults =
                    "-------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(datetime, "MM-DD-YYYY"); 
                console.log(concertResults);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
// value = "rolling stones";
// concertThis(value);

//spotify this api call function utilizing node-spotify
    function spotifyThis(value) {
        if(!value){
            value = "The Sign Ace of Base";
        }
        spotify
        .search({ type: 'track', query: value })
        .then(function(response) {
            for (var i = 0; i < 10; i++) {
                var spotifyReturn = 
                    "-------------------------------------------" +
                        "\nArtist: " + response.tracks.items[i].artists[0].name + 
                        "\nSong Name: " + response.tracks.items[i].name +
                        "\nAlbum Name: " + response.tracks.items[i].album.name +
                        "\nPreview Link: " + response.tracks.items[i].preview_url;        
                console.log(spotifyReturn);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    };

// spotifyThis();