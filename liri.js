require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var nodeArgs = process.argv;

// var data =
// fs.readFile("random.txt", "utf8", function(err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   data = data.split(", ");

//   if (data === "spotify-this-song") {
//     songInfo()
//   } else if (data === "concert-this"){
//     bandInfo()
//   } else if (data === "movie-this"){
//     movieInfo
//   }
  

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
  spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } 
  console.log(JSON.stringify(data.tracks.items[0].artists[0].name));
  console.log(JSON.stringify(data.tracks.items[0].name));
  console.log(JSON.stringify(data.tracks.items[0].preview_url));
  console.log(JSON.stringify(data.tracks.items[0].album.name));
});
};

function bandInfo(){

  var bandName = "";

  for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      bandName = bandName + "+" + nodeArgs[i];
    } else {
      bandName += nodeArgs[i];
    }
}
  var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=trilogy"

  console.log(queryUrl)
  axios.get(queryUrl).then(
    function(response) {
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.location);
      console.log(response.data[0].datetime);
})};

