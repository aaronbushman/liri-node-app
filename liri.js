require("dotenv").config();

var keys = require("./keys.js");
console.log(keys);


function spotifyIt(musicSearch) {

    var spotify = new Spotify(keys.spotify);
    if (musicSearch === undefined || null) {
        musicSearch = "a new day skullsnaps";
    }

    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error: ' + err);
        }
                    
        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++){
            
                var musicQuery = data.tracks.items[i];
                console.log("---------------------------");
                console.log("Artist: " + musicQuery.artists[0].name +
                "\nSong Name: " + musicQuery.name +
                "\nLink to Song: " + musicQuery.preview_url +
                "\nAlbum Name: " + musicQuery.album.name +
                "\n---------------------------");
            }
        };  
    });
};

function concertIt(bandQuery) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    console.log("test------------");
    console.log(queryUrl);
    console.log("test------------");

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            var concertData = JSON.parse(body);

            var concertDT = concertData[0].datetime
            var momentDT = moment().format('L');

            console.log("---------------------------");
            console.log("Venue Name : " + concertData[0].venue.name +
                "\nVenue Location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
                "\nDate of the Event: " + momentDT +
                "\n---------------------------");
            
        };
    });
};

function movieIt (movieQuery) {
 
     if (movieQuery === undefined || null) {
            movieQuery = "Mr.Nobody";
        }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";


    console.log("test------------");
    console.log(queryUrl);
    console.log("test------------");

    request(queryUrl, function (error, response, body) { 
       if (!error && response.statusCode === 200) {      
            var movieData = JSON.parse(body);
                console.log("---------------------------");         
                console.log("Movie Title: " + movieData.Title +
                "\nYear: " + movieData.released +
                "\nIMDB Rating: " + movieData.imdbRating +
                "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
                "\nCountry: " + movieData.Country +
                "\nLanguage: " + movieData.Language +
                "\nPlot: " + movieData.Plot +
                "\nActors: " + movieData.Actors +
                "\n---------------------------");             
        };
    }); 
};

// spotifyIt("os mutantes");