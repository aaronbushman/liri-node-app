require("dotenv").config();

//required in package-lock
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
moment().format();

var keys = require("./keys.js");
console.log(keys);

//add keys to node-spot api call function
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
    case "spotify-this":
        spotifyThis(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};

//do what it says function utilizing fs to read and act on random.txt
function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataRead = data.split(',');
        spotifyThis(dataRead[0], dataRead[1]);
    })
};
//for testing
//doThis();

//concert search api call function using axios
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {

                var datetime = response.data[i].datetime;

                var concertResults =
                    "*#-------------------------------------------#*" +
                    "\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(datetime).format("dddd, MMMM Do YYYY, h:mm:ss a");
                console.log(concertResults);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

//for testing
// value = "rolling stones";
// concertThis(value);

//spotify this api call function utilizing node-spotify
function spotifyThis(value) {
    if (!value) {
        value = "The Sign Ace of Base";
    }
    spotify
        .search({ type: 'track', query: value })
        .then(function (response) {
            for (var i = 0; i < 10; i++) {
                var spotifyReturn =
                    "*#-------------------------------------------#*" +
                    "\nArtist: " + response.tracks.items[i].artists[0].name +
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                console.log(spotifyReturn);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};

//for testing
// spotifyThis();

//movie-this omdb api call function utilizing axios
function movieThis(value) {
    if (!value) {
        value = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            var movieResults =
                "*#-------------------------------------------#*" +
                "\nMovie Title: " + response.data.Title +
                "\nYear of Release: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nCountry Produced: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
        })
        .catch(function (error) {
            console.log(error);
        });
};

// for test
// movieThis();

