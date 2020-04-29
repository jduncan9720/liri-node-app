require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var nodeArgs = process.argv;
var input = process.argv[3];

switch (nodeArgs[2]) {
  case 'spotify-this-song':
    if (input === undefined) {
      input = 'Crash';
    }
    songInfo(input);
    break;
  case 'concert-this':
    if (input === undefined) {
      input = 'The Sign';
    }
    bandInfo(input);
    break;
  case 'movie-this':
    if (input === undefined) {
      input = 'Mr. Nobdy';
    }
    movieInfo(input);
    break;
  case 'do-what-it-says':
    autoFill();
    break;
}

function songInfo() {

  var Spotify = require("node-spotify-api")
  var keys = require("./keys.js");
  var spotify = new Spotify(keys.spotify);
  var songName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      songName = songName + "+" + nodeArgs[i];
    } else {
      songName += nodeArgs[i];
    }
  }
  spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(JSON.stringify("Artist: " + data.tracks.items[0].artists[0].name));
    console.log(JSON.stringify("Song Name: " + data.tracks.items[0].name));
    console.log(JSON.stringify("Song Preview: " + data.tracks.items[0].preview_url));
    console.log(JSON.stringify("Album: " + data.tracks.items[0].album.name));
  });
};

function bandInfo() {

  var bandName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      bandName = bandName + "+" + nodeArgs[i];
    } else {
      bandName += nodeArgs[i];
    }
  }
  var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=trilogy"

  axios.get(queryUrl).then(
    function (response) {
      console.log("Show Venue: " + response.data[0].venue.name);
      console.log("Venue Location: " + response.data[0].venue.location);
      console.log("Show Date: " + response.data[0].datetime);
    })
};

function movieInfo() {

  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&tomatoes&apikey=1465f66e"

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
    data = data.split(", ");
    //input

    if (data === "spotify-this-song") {
      songInfo()
    } else if (data === "concert-this") {
      bandInfo()
    } else if (data === "movie-this") {
      movieInfo()
    }
    console.log(data)
  });
};