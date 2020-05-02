require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var nodeArgs = process.argv;
var input = process.argv[3];

switch (nodeArgs[2]) {
  case 'spotify-this-song':
    var song = "The Sign";
    if(input){
      song = input;
    }
    songInfo(song);
    break;
  case 'concert-this':
    var band = "Bad Omens"
    if (input){
      band = input;
    }
    bandInfo(band);
    break;
  case 'movie-this':
    var movie = "Mr. Nobody"
    if (input){
      movie = input;
    }
    movieInfo(movie);
    break;
  case 'do-what-it-says':
    autoFill();
    break;
}
function songInfo(song) {
  var Spotify = require("node-spotify-api")
  var keys = require("./keys.js");
  var spotify = new Spotify(keys.spotify);
  
  spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(JSON.stringify("Artist: " + data.tracks.items[0].artists[0].name));
    console.log(JSON.stringify("Song Name: " + data.tracks.items[0].name));
    console.log(JSON.stringify("Song Preview: " + data.tracks.items[0].preview_url));
    console.log(JSON.stringify("Album: " + data.tracks.items[0].album.name));
  });
};

function bandInfo(band) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=trilogy"
  axios.get(queryUrl).then(
    function (response) {
      var concertDate = response.data[0].datetime;
      var dateFormat = "YYYY-MM-DDTH";
      var convertedDate = moment(concertDate, dateFormat)
      console.log("Show Venue: " + response.data[0].venue.name);
      console.log("Venue Location: " + response.data[0].venue.location);
      console.log("Show Date: " + convertedDate.format("MM/DD/YY"));
    })
};
function movieInfo(movie) {

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&tomatoes&apikey=1465f66e"
  axios.get(queryUrl).then(
    function (response) {
      console.log("Movie Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value)
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Movie Plot: " + response.data.Plot);
      console.log("Actors/Actresses: " + response.data.Actors);
    })
};
function autoFill() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    splitData = data.split(",");
    console.log(splitData[0]);
    if (splitData[0] === "spotify-this-song") {
      songInfo(splitData[1]);
    } else if (splitData[0] === "concert-this") {
      bandInfo(splitData[1])
    } else if (splitData[0] === "movie-this") {
      movieInfo(splitData[1])
    } else {
      console.log("Nope")
    }
    
  });
};